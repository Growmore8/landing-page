import { PDFParse } from "pdf-parse";
import fs from "fs";
import { pipeline } from "@xenova/transformers";

function chunkText(text, size = 500, overlap = 100) {
  const clean = text.replace(/\s+/g, " ").trim();
  const chunks = [];
  let i = 0;
  while (i < clean.length) {
    chunks.push(clean.slice(i, i + size));
    i += size - overlap;
  }
  return chunks;
}

async function main() {
  console.log("Reading PDF...");
  const buffer = fs.readFileSync("./docs/support-doc.pdf");
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  const text = result.text;

  const chunks = chunkText(text);
  console.log(`Created ${chunks.length} chunks`);

  console.log("Loading embedding model...");
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const data = [];
  for (let i = 0; i < chunks.length; i++) {
    const output = await embedder(chunks[i], { pooling: "mean", normalize: true });
    data.push({ content: chunks[i], embedding: Array.from(output.data) });
    console.log(`Embedded chunk ${i + 1}/${chunks.length}`);
  }

  fs.writeFileSync("./public/data/embeddings.json", JSON.stringify(data));
  console.log("Done. Saved to public/data/embeddings.json");
}

main();