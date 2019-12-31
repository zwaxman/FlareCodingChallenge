import stopWords from './stopWords'

export default (text, excludeStopWords) => {
  let indexStart = 0;
  let indexEnd = 0;
  const trie = new Trie();
  const minNumWords = 10
  let numWords = 0
  let numDistinctWords = 0
  const topWords = new TopNWords(minNumWords)
  while (indexEnd < text.length) {
    const char = text[indexEnd];
    if (!isAlpha(char)) {
      if (indexEnd - indexStart >= 1) {
        const word = removeSuffix(
          text.slice(indexStart, indexEnd).toLowerCase()
        );
        
        if (!excludeStopWords || !stopWords.has(word)) {
            numWords++
            const count = trie.addWord(word);
            numDistinctWords = count===1 ? numDistinctWords+1 : numDistinctWords
            topWords.addWord(word, count)
            console.log(topWords, numWords, numDistinctWords)
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
        numWords++
        const count = trie.addWord(word);
        numDistinctWords = count===1 ? numDistinctWords+1 : numDistinctWords
        topWords.addWord(word, count)
        console.log(topWords, numWords, numDistinctWords)
    }
  }
};

const isAlpha = char => {
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(char);
};

const endsWithSilentE = word => {
  return /([aeiou][b-df-hj-np-tv-xz])|([b-df-hj-np-tv-xz][cg])/.test(word.slice(word.length - 2));
};

const endsWithDoubleConsonant = word => {
    return /([bdgmnprst])\1/.test(word.slice(word.length-2))
}

const removeSuffix = word => {
  const length = word.length;
  if (length >= 5) {
    if (word.slice(length - 3) === "ing") {
        if (endsWithDoubleConsonant(word.slice(length-3))) {
            return word.slice(0,length-4)
        } else if (endsWithSilentE(word.slice(0,length-3))) {
            return word.slice(0,length-3).concat('e')
        } else {
            return word.slice(0,length-3)
        }
    } else if (
      word.slice(length - 3) === "ies" ||
      word.slice(length - 3) === "ied"
    ) {
      return word.slice(0, length - 3).concat("y");
    }
  }
  if (length >= 4) {
    if (word.slice(length - 2) === "ed" || word.slice(length - 2) === "es") {
      return endsWithSilentE(word.slice(0, length - 2))
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

class TopNWords {
    constructor(minNumWords) {
        this.minNumWords = minNumWords
        this.numWords=0
        this.wordCounts = {}
        this.minWordCount=1
    }

    addWord(word, count) {
        if (this.numWords<this.minNumWords || count>=this.minWordCount) {
            if (!this.wordCounts[count]) {
                this.wordCounts[count]=new Set()
            } 
            this.wordCounts[count].add(word)
            if (count===this.minWordCount) {
                this.numWords++
            } else if (count>this.minWordCount) {
                this.wordCounts[count-1].delete(word)
                if (count===this.minWordCount+1 && this.numWords - this.wordCounts[count-1].size === this.minNumWords) {
                        this.numWords -= this.wordCounts[count-1].size
                        this.minWordCount = count
                }
                if (this.wordCounts[count-1].size===0) {
                    delete this.wordCounts[count-1]
                }
            }
        }
    }
}


