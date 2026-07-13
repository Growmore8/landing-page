// scripts/generate-embeddings.cjs
// Run: node scripts/generate-embeddings.cjs

const fs = require("fs");
const path = require("path");

const PDF_PATH = path.resolve(__dirname, "../docs/support-doc.pdf");
const OUT_PATH = path.resolve(__dirname, "../public/data/embeddings.json");
const MAX_CHUNK_SIZE = 600;   // only used to sub-split oversized sections
const MIN_CHUNK_SIZE = 40;

// --- heuristics -------------------------------------------------

// A line that looks like a heading: short, no trailing period,
// often numbered ("7.", "3.2") or Title/UPPER Case.
function isHeadingLine(line) {
  const t = line.trim();
  if (!t || t.length > 80) return false;
  if (/[.:]$/.test(t) && !/^\d+(\.\d+)*\.?$/.test(t.split(" ")[0])) return false;
  const numbered = /^\d+(\.\d+)*[.)]?\s+\S/.test(t);
  const titleCase = /^[A-Z][A-Za-z0-9 &/()'-]+$/.test(t) && t.split(" ").length <= 10;
  return numbered || titleCase;
}

// A line that looks like a table row: 2+ "columns" separated by
// multiple spaces/tabs (typical of PDF-extracted tables).
function isTableRowLine(line) {
  return /\S(\s{2,}|\t)\S/.test(line.trim());
}

// --- structure-aware splitting -----------------------------------

function splitIntoBlocks(rawText) {
  // Preserve line breaks — do NOT flatten \s+ globally, that's what
  // destroyed the table structure before.
  const lines = rawText
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.replace(/[ \t]+/g, (m) => (m.length > 1 ? "  " : " ")).trimEnd())
    .filter((l) => l.trim().length > 0);

  const blocks = [];
  let current = { heading: null, lines: [] };
  let inTable = false;
  let tableBuffer = [];

  const flushCurrent = () => {
    if (current.lines.length) blocks.push(current);
    current = { heading: current.heading, lines: [] };
  };
  const flushTable = () => {
    if (tableBuffer.length) {
      blocks.push({ heading: current.heading, lines: tableBuffer, isTable: true });
      tableBuffer = [];
    }
    inTable = false;
  };

  for (const line of lines) {
    if (isHeadingLine(line)) {
      flushTable();
      flushCurrent();
      current = { heading: line.trim(), lines: [] };
      continue;
    }
    if (isTableRowLine(line)) {
      inTable = true;
      tableBuffer.push(line);
      continue;
    }
    if (inTable) flushTable(); // table ended, back to prose
    current.lines.push(line);
  }
  flushTable();
  flushCurrent();

  return blocks.filter((b) => b.lines.length);
}

// Sub-split an oversized prose block on sentence boundaries only —
// never mid-word, never mid-sentence.
function splitProse(text, size) {
  if (text.length <= size) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)/g) || [text];
  const out = [];
  let buf = "";
  for (const s of sentences) {
    if ((buf + s).length > size && buf) {
      out.push(buf.trim());
      buf = s;
    } else {
      buf += s;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

function buildChunks(blocks) {
  const chunks = [];
  for (const block of blocks) {
    const heading = block.heading ? `${block.heading}\n` : "";
    const body = block.lines.join("\n");

    if (block.isTable) {
      // keep whole table as one chunk — never split rows apart
      chunks.push(`${heading}${body}`.trim());
      continue;
    }

    const parts = splitProse(body, MAX_CHUNK_SIZE);
    for (const p of parts) chunks.push(`${heading}${p}`.trim());
  }
  return chunks.filter((c) => c.length >= MIN_CHUNK_SIZE);
}

// --- main ----------------------------------------------------------

async function main() {
  const { PDFParse, VerbosityLevel } = require("pdf-parse");
  const buffer = fs.readFileSync(PDF_PATH);

  console.log("📄 Parsing PDF…");
  const parser = new PDFParse({ data: buffer, verbosity: VerbosityLevel.ERRORS });
  const result = await parser.getText();
  const text = result.text;
  await parser.destroy();

  const blocks = splitIntoBlocks(text);
  const chunks = buildChunks(blocks);
  console.log(`✂️  ${chunks.length} structure-aware chunks created`);

  console.log("🤖 Loading embedder (first run downloads ~23 MB)…");
  const { pipeline, env } = await import("@xenova/transformers");
  env.allowLocalModels = false;
  env.useBrowserCache = false;

  const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { quantized: true });

  const results = [];
  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`\r⚙️  Embedding ${i + 1}/${chunks.length}`);
    const out = await embedder(chunks[i], { pooling: "mean", normalize: true });
    results.push({ content: chunks[i], embedding: Array.from(out.data) });
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(results));
  console.log(`\n✅ Saved ${results.length} embeddings → ${OUT_PATH}`);
}

main().catch((err) => { console.error(err); process.exit(1); });