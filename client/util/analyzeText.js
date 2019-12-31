import stopWords from "./stopWords";
import Trie from "./Trie";
import TopWords from "./TopWords";

export default (fileName, text, excludeStopWords) => {
  let indexStart = 0;
  let indexEnd = 0;
  const trie = new Trie();
  const minNumWords = 10;
  let numTotalWords = 0;
  let numDistinctWords = 0;
  const topWords = new TopWords(minNumWords);

  while (indexEnd < text.length) {
    const char = text[indexEnd];
    if (
      !isAlphaNumeric(char) ||
      (indexEnd === text.length - 1 && isAlphaNumeric(char))
    ) {
      if (indexEnd - indexStart >= 1) {
        const word = removeSuffix(
          text.slice(indexStart, indexEnd).toLowerCase()
        );
        if (!excludeStopWords || !stopWords.has(word)) {
          numTotalWords++;
          const count = trie.addWord(word);
          numDistinctWords =
            count === 1 ? numDistinctWords + 1 : numDistinctWords;
          topWords.addWord(word, count);
        }
      }
      indexStart = indexEnd + 1;
    }
    indexEnd++;
  }

  const wordCounts = topWords.getWordCounts()
  for (let count in wordCounts) {
      wordCounts[count] = Array.from(wordCounts[count])
  }

  return {fileName, text, wordCounts, numTotalWords, numDistinctWords, excludeStopWords}
};

const isAlphaNumeric = char => {
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(char);
};

const endsWithSilentE = word => {
  return /([aeiou][b-df-hj-np-tv-xz])|([b-df-hj-np-tv-xz][cg])/.test(
    word.slice(word.length - 2)
  );
};

const endsWithDoubleConsonant = word => {
  return /([bdgmnprst])\1/.test(word.slice(word.length - 2));
};

const removeSuffix = word => {
  const length = word.length;
  if (length >= 5) {
    if (word.slice(length - 3) === "ing") {
      if (endsWithDoubleConsonant(word.slice(0, length - 3))) {
        return word.slice(0, length - 4);
      } else if (endsWithSilentE(word.slice(0, length - 3))) {
        return word.slice(0, length - 3).concat("e");
      } else {
        return word.slice(0, length - 3);
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
