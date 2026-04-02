import { crawlAndIndex } from "../services/crawl.service.js";

export async function crawlController(req, res) {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    const result = await crawlAndIndex(url);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
