import axios from "axios";
import * as cheerio from 'cheerio';
import { URL } from "url";
import https from "https";

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});

export class Crawler {
    constructor({ maxPages = 20, concurrency = 3 } = {}) {
        this.visited = new Set();
        this.queue = [];
        this.maxPages = maxPages;
        this.concurrency = concurrency;
        this.active = 0;
    }
    async crawl(startUrl, onPage) {
        this.queue.push(startUrl);

        return new Promise((resolve) => {
            const next = async () => {
                if (this.visited.size >= this.maxPages) return resolve();
                if (this.queue.length === 0 && this.active === 0) return resolve();

                while (this.active < this.concurrency && this.queue.length) {
                    const url = this.queue.shift();
                    if (this.visited.has(url)) continue;

                    this.active++;
                    this.visited.add(url);

                    this.fetchAndProcess(url, onPage)
                        .catch((err) => { console.error("Crawl error:", err.message); })
                        .finally(() => {
                            this.active--;
                            next();
                        });
                }
            };

            next();
        });
    }
    async fetchAndProcess(pageUrl, onPage) {
        const { data } = await axios.get(pageUrl, { timeout: 5000, httpsAgent });
        const $ = cheerio.load(data);

        const text = $("body").text();
        await onPage(pageUrl, text);

        const base = new URL(pageUrl).origin;

        $("a[href]").each((_, el) => {
            let link = $(el).attr("href");
            if (!link) return;

            try {
                const absolute = new URL(link, base).href;
                if (!this.visited.has(absolute)) this.queue.push(absolute);
            } catch { }
        });
    }
}
