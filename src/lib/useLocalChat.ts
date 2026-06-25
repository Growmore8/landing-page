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
      const qEmbedding = await embedderRef.current(question, { pooling: "mean", normalize: true });
      const qVec = Array.from(qEmbedding.data) as number[];

      const scored = chunksRef.current
        .map((c) => ({ ...c, score: cosineSim(qVec, c.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const context = scored.map((c) => c.content).join("\n");
      const prompt = `Context: ${context}\n\nQuestion: ${question}\nAnswer based only on the context above:`;

      // Use simple keyword matching as fallback generator (no model download)
      const contextLower = context.toLowerCase();
      const questionLower = question.toLowerCase();
      
      // Find the most relevant sentence from context
      const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20);
      const keywords = questionLower.split(" ").filter(w => w.length > 3);
      
      const bestSentence = sentences
        .map(s => ({
          text: s.trim(),
          score: keywords.filter(k => s.toLowerCase().includes(k)).length
        }))
        .sort((a, b) => b.score - a.score)[0];

      if (bestSentence && bestSentence.score > 0) {
        return bestSentence.text + ".";
      }

      return scored.length > 0
        ? scored[0].content.split(".")[0] + "."
        : "I couldn't find relevant information about that in our docs.";

    } catch (err: any) {
      console.error("Ask failed:", err);
      return "Sorry, something went wrong answering that.";
    } finally {
      setLoading(false);
    }
  }, []);

  return { init, ask, loading, ready, error };
}
