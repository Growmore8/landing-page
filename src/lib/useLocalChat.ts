"use client";
import { useState, useRef, useCallback } from "react";

type Chunk = { content: string; embedding: number[] };

function cosineSim(a: number[], b: number[]) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// --- lightweight typo correction ---------------------------------
// Not a general spellchecker — just nudges obviously-mistyped domain
// words ("pricinf" -> "pricing") back toward vocabulary that actually
// appears in the docs, so the embedder gets a cleaner signal. Cheap
// Levenshtein distance, no dependency needed.

const DOMAIN_VOCAB = [
  "pricing", "price", "spread", "spreads", "commission", "commissions",
  "fee", "fees", "deposit", "deposits", "withdrawal", "withdrawals",
  "account", "accounts", "demo", "live", "leverage", "margin", "swap",
  "kyc", "verification", "compliance", "regulation", "risk", "hedging",
  "order", "orders", "trading", "trade", "trades", "instrument", "instruments",
  "forex", "crypto", "cryptocurrency", "cfd", "cfds", "equities", "commodities",
  "support", "sla", "uptime", "api", "fix", "websocket", "liquidity",
  "manager", "admin", "client", "broker", "dashboard", "notification",
  "notifications", "chart", "charts", "analytics", "signal", "signals",
  "copy", "calendar", "news", "onboarding", "tier", "tiers", "institutional",
  "professional", "prime", "starter", "glossary", "platform",
];

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function correctToken(token: string): string {
  const lower = token.toLowerCase();
  if (lower.length < 4) return token; // too short to safely correct
  if (DOMAIN_VOCAB.includes(lower)) return token; // already correct

  let best: string | null = null;
  let bestDist = Infinity;
  for (const word of DOMAIN_VOCAB) {
    // Only compare against words of similar length to avoid weird matches
    if (Math.abs(word.length - lower.length) > 2) continue;
    const dist = levenshtein(lower, word);
    if (dist < bestDist) {
      bestDist = dist;
      best = word;
    }
  }

  // Allow up to 2 character edits for words 6+ chars, 1 edit for shorter ones.
  const threshold = lower.length >= 6 ? 2 : 1;
  return best && bestDist <= threshold ? best : token;
}

function correctQueryForRetrieval(question: string): string {
  return question
    .split(/(\s+)/) // keep whitespace so we can rejoin cleanly
    .map((piece) => (/^\s+$/.test(piece) ? piece : correctToken(piece.replace(/[.,!?]$/, ""))))
    .join("");
}

export function useLocalChat() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const embedderRef = useRef<any>(null);
  const chunksRef = useRef<Chunk[]>([]);

  const init = useCallback(async () => {
    try {
      setError(null);
      const { pipeline, env } = await import("@xenova/transformers");
      env.allowLocalModels = false;
      env.useBrowserCache = true;
      env.backends.onnx.wasm.proxy = false;

      // Smallest possible embedder ~23MB only, no generator
      embedderRef.current = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2",
        { quantized: true }
      );

      const res = await fetch("/data/embeddings.json");
      if (!res.ok) throw new Error(`Failed to load embeddings.json (${res.status})`);
      chunksRef.current = await res.json();

      setReady(true);
    } catch (err: any) {
      console.error("Chat init failed:", err);
      setError(err.message ?? String(err));
    }
  }, []);

  const ask = useCallback(async (question: string): Promise<string> => {
    setLoading(true);
    try {
      // Use a typo-corrected version of the query ONLY for embedding/retrieval.
      // The original question (with the user's actual typo) is still what
      // gets sent to the LLM and saved in chat history, so nothing user-facing
      // changes except better retrieval.
      const retrievalQuery = correctQueryForRetrieval(question);

      const qEmbedding = await embedderRef.current(retrievalQuery, {
        pooling: "mean",
        normalize: true,
      });
      const qVec = Array.from(qEmbedding.data) as number[];

      const TOP_K = 10;
      const scored = chunksRef.current
        .map((c) => ({ ...c, score: cosineSim(qVec, c.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, TOP_K);

      const MIN_SCORE = 0.25;
      const relevant = scored.filter((c) => c.score >= MIN_SCORE);

      console.log("Query:", question, "| Corrected for retrieval:", retrievalQuery);
      scored.forEach((c, i) =>
        console.log(`${i + 1}. [${c.score.toFixed(3)}]`, c.content.slice(0, 80))
      );

      if (relevant.length === 0) {
        return "I don't have that information in our docs. Please contact support at info@growmoresolutions.lk";
      }

      const CONTEXT_CHUNKS = 5;
      const context = relevant
        .slice(0, CONTEXT_CHUNKS)
        .map((c) => c.content.trim())
        .join("\n\n");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ask", question, context }),
      });
      const data = await res.json();
      return data.answer ?? "Sorry, I couldn't generate an answer.";
    } catch (err: any) {
      console.error("Ask failed:", err);
      return "Sorry, something went wrong answering that.";
    } finally {
      setLoading(false);
    }
  }, []);

  return { init, ask, loading, ready, error };
}