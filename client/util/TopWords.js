export default class TopWords {
  constructor(minNumWords) {
    this.minNumWords = minNumWords;
    this.numWords = 0;
    this.wordCounts = {};
    this.minWordCount = 1;
  }

  addWord(word, count) {
    if (this.numWords < this.minNumWords || count >= this.minWordCount) {
      if (!this.wordCounts[count]) {
        this.wordCounts[count] = new Set();
      }
      this.wordCounts[count].add(word);
      if (count === this.minWordCount) {
        this.numWords++;
      } else if (count > this.minWordCount) {
        this.wordCounts[count - 1].delete(word);
        if (
          count === this.minWordCount + 1 &&
          this.numWords - this.wordCounts[count - 1].size === this.minNumWords
        ) {
          this.numWords -= this.wordCounts[count - 1].size;
          this.minWordCount = count;
          delete this.wordCounts[count - 1];
        } else if (this.wordCounts[count - 1].size === 0) {
          delete this.wordCounts[count - 1];
        }
      }
    }
  }

  getWordCounts() {
    return this.wordCounts;
  }
}
