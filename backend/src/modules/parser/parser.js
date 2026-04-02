export class Parser {
  static stopWords = new Set(["the", "is", "a", "an", "of", "and"]);

  static tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 2 && !this.stopWords.has(w));
  }
}