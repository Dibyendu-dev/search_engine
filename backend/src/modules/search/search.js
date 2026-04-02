import { Parser } from "../parser/parser.js";

export class SearchEngine {
  constructor(index, totalDocs) {
    this.index = index;
    this.totalDocs = totalDocs;
  }

  tfidf(word, docId, postings) {
    const tf = postings.get(docId).length;
    const idf = Math.log(this.totalDocs / postings.size);
    return tf * idf;
  }

  search(query) {
    const words = Parser.tokenize(query);
    const scores = new Map();

    words.forEach(word => {
      const postings = this.index.get(word);
      if (!postings) return;

      postings.forEach((_, docId) => {
        const score = this.tfidf(word, docId, postings);
        scores.set(docId, (scores.get(docId) || 0) + score);
      });
    });

    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([docId, score]) => ({ docId, score }));
  }

  // Phrase search
  phraseSearch(phrase) {
    const words = Parser.tokenize(phrase);
    if (words.length < 2) return [];

    const first = this.index.get(words[0]);
    if (!first) return [];

    const results = [];

    first.forEach((positions, docId) => {
      let match = true;

      for (let i = 1; i < words.length; i++) {
        const postings = this.index.get(words[i]);
        if (!postings || !postings.has(docId)) {
          match = false;
          break;
        }
      }

      if (match) results.push(docId);
    });

    return results;
  }
}