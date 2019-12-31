import stopWords from './stopWords'

export default (text, excludeStopWords) => {
  let indexStart = 0;
  let indexEnd = 0;
  const trie = new Trie();
  while (indexEnd < text.length) {
    const char = text[indexEnd];
    if (!isAlpha(char)) {
      if (indexEnd - indexStart >= 1) {
        const word = removeSuffix(
          text.slice(indexStart, indexEnd).toLowerCase()
        );
        if (!excludeStopWords || !stopWords.has(word)) {
            const count = trie.addWord(word);
            console.log(word, count);
        }
      }
      indexStart = indexEnd + 1;
    }
    indexEnd++;
  }
  if (indexEnd - indexStart >= 1) {
    const word = removeSuffix(
      text.slice(indexStart, indexEnd).toLowerCase()
    );
    if (!excludeStopWords || !stopWords.has(word)) {
        const count = trie.addWord(word);
        console.log(word, count);
    }
  }
};

const isAlpha = char => {
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(char);
};

const endsWithSilentE = word => {
  return /[aeiou][b-df-hj-np-tv-xz]e/.test(word.slice(word.length - 3));
};

const removeSuffix = word => {
  const length = word.length;
  if (length >= 5) {
    if (word.slice(length - 3) === "ing") {
      return word.slice(0, length - 3);
    } else if (
      word.slice(length - 3) === "ies" ||
      word.slice(length - 3) === "ied"
    ) {
      return word.slice(0, length - 3).concat("y");
    }
  }
  if (length >= 4) {
    if (word.slice(length - 2) === "ed" || word.slice(length - 2) === "es") {
      return endsWithSilentE(word.slice(0, length - 1))
        ? word.slice(0, length - 1)
        : word.slice(0, length - 2);
    }
  }
  if (length >= 3) {
    if (word[length - 1] === "s" && word[length - 2] !== "s") {
      return word.slice(0, length - 1);
    }
  }
  return word;
};

class Trie {
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
      this.trie[currentChar].count = this.trie[currentChar].count + 1;
      return this.trie[currentChar].count;
    } else {
      if (!this.trie[currentChar]) {
        this.trie[currentChar] = new Trie();
      }
      return this.trie[currentChar].addWord(word.slice(1));
    }
  }
}


