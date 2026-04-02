import fs from "fs";
import path from "path";
import { Parser } from "../modules/parser/parser.js";
import { InvertedIndex } from "../modules/indexer/indexer.js";
import { Storage } from "../modules/storage/storage.js";
import { CONFIG } from "../config/config.js";

export async function buildIndex() {
  const index = new InvertedIndex();

  const files = fs.readdirSync(CONFIG.DATA_DIR);

  for (const file of files) {
    const content = fs.readFileSync(path.join(CONFIG.DATA_DIR, file), "utf-8");
    const words = Parser.tokenize(content);
    index.addDocument(file, words);
  }

  await Storage.save(index);

  return { totalDocs: files.length };
}