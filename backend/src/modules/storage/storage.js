import fs from "fs/promises";
import { CONFIG } from "../../config/config.js";

export class Storage {
  static async save(index) {
    const obj = Object.fromEntries(
      [...index.index.entries()].map(([k, v]) => [k, Object.fromEntries(v)])
    );
    await fs.writeFile(CONFIG.INDEX_FILE, JSON.stringify(obj));
  }

  static async load() {
    try {
      const data = JSON.parse(await fs.readFile(CONFIG.INDEX_FILE));
      const idx = new Map();

      for (let word in data) {
        idx.set(word, new Map(Object.entries(data[word])));
      }

      return idx;
    } catch {
      return new Map();
    }
  }
}