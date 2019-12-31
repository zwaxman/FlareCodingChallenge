export default class Trie {
    constructor() {
      this.trie = {};
      this.count = 0;
    }
  
    addWord(word) {
      let currentChar = word[0];
      if (word.length === 1) {
        if (!this.trie[currentChar]) {
          this.trie[currentChar] = new Trie();
        }
        this.trie[currentChar].count++;
        return this.trie[currentChar].count;
      } else {
        if (!this.trie[currentChar]) {
          this.trie[currentChar] = new Trie();
        }
        return this.trie[currentChar].addWord(word.slice(1));
      }
    }
  }