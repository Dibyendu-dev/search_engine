import { Storage } from "../modules/storage/storage.js";
import { SearchEngine } from "../modules/search/search.js";

export async function searchController(req, res) {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Query required" });

    const index = await Storage.load();
    const engine = new SearchEngine(index, 100);

    const results = q.startsWith('"')
      ? engine.phraseSearch(q.replace(/"/g, ""))
      : engine.search(q);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}