// scripts/generate-embeddings.mjs
// Run: node scripts/generate-embeddings.mjs

import { readFileSync, writeFileSync } from "fs";
import { createRequire } from "module";
import { pipeline, env } from "@xenova/transformers";
const require = createRequire(import.meta.url);
const { PDFParse } = require("pdf-parse");

env.allowLocalModels = false;
env.useBrowserCache = false;

const PDF_PATH = "./docs/support-doc.pdf";
const OUT_PATH = "./public/data/embeddings.json";
const CHUNK_SIZE = 400;   // chars per chunk
const CHUNK_OVERLAP = 80; // overlap between chunks

function chunkText(text, size, overlap) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + size).trim());
    i += size - overlap;
  }
  return chunks.filter((c) => c.length > 40);
}

console.log("📄 Parsing PDF…");
const buffer = readFileSync(PDF_PATH);
const parser = new PDFParse();
const { text } = await parser.parse(buffer);

const chunks = chunkText(text.replace(/\s+/g, " "), CHUNK_SIZE, CHUNK_OVERLAP);
console.log(`✂️  ${chunks.length} chunks created`);

console.log("🤖 Loading embedder (first run downloads ~23 MB)…");
const embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", { quantized: true });

const results = [];
for (let i = 0; i < chunks.length; i++) {
  process.stdout.write(`\r⚙️  Embedding ${i + 1}/${chunks.length}`);
  const out = await embedder(chunks[i], { pooling: "mean", normalize: true });
  results.push({ content: chunks[i], embedding: Array.from(out.data) });
}

writeFileSync(OUT_PATH, JSON.stringify(results));
console.log(`\n✅ Saved ${results.length} embeddings → ${OUT_PATH}`);
