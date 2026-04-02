export class InvertedIndex {
  constructor() {
    this.index = new Map();
    this.docCount = 0;
  }

  addDocument(docId, words) {
    this.docCount++;

    words.forEach((word, pos) => {
      if (!this.index.has(word)) this.index.set(word, new Map());

      const postings = this.index.get(word);
      if (!postings.has(docId)) postings.set(docId, []);

      postings.get(docId).push(pos);
    });
  }

  getDocs(word) {
    return this.index.get(word) || new Map();
  }
}
