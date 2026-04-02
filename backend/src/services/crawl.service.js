import { Crawler } from "../modules/crawler/crawler.js";
import { Parser } from "../modules/parser/parser.js";
import { InvertedIndex } from "../modules/indexer/indexer.js";
import { Storage } from "../modules/storage/storage.js";

export async function crawlAndIndex(startUrl) {
  const crawler = new Crawler({ maxPages: 30, concurrency: 5 });
  const index = new InvertedIndex();

  await crawler.crawl(startUrl, async (url, text) => {
    const words = Parser.tokenize(text);
    index.addDocument(url, words);
    console.log("Indexed:", url);
  });

  await Storage.save(index);
  return { pagesIndexed: index.docCount };
}