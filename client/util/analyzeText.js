import stopWords from "./stopWords";
// import Trie from "./Trie";
import TopWords from "./TopWords";

export default (fileName, text, excludeStopWords) => {
  let indexStart = 0; //initiate two pointers that will run along the text and delimit a word
  let indexEnd = 0;

  //   const trie = new Trie();
  const wordCountsMap = new Map();

  const minNumWords = 25; //the minimum number of top frequency words, there can be more if some words are tied
  const topWords = new TopWords(minNumWords); //this ADT will keep track of the most frequent words

  let numTotalWords = 0; //the total number of words in the file
  let numDistinctWords = 0; //the total number of distinct words in the file

  while (indexEnd < text.length) {
    const char = text[indexEnd];
    if (
      !isAlphaNumeric(char) || //if the char isn't alphanumeric (ie. char is a word delimiter)
      (indexEnd === text.length - 1 && isAlphaNumeric(char)) //or we are on the last character of the text (edge case)
    ) {
      if (indexEnd - indexStart >= 1) {
        const word = getRootWord(
          text.slice(indexStart, indexEnd).toLowerCase()
        );
        if (!excludeStopWords || !stopWords.has(word)) {
          //   const count = trie.addWord(word);
          const prevCount = wordCountsMap.get(word) || 0;
          const count = prevCount + 1;
          wordCountsMap.set(word, count);
          topWords.addWord(word, count);
          numTotalWords++;
          numDistinctWords =
            count === 1 ? numDistinctWords + 1 : numDistinctWords;
        }
      }
      indexStart = indexEnd + 1;
    }
    indexEnd++;
  }

  const wordCounts = topWords.getWordCounts();
  for (let count in wordCounts) {
    //wordCounts associates each high frequency word count (key) with a Set of words at that word count (value). Here we are just converting those Sets to arrays for ease of use
    wordCounts[count] = Array.from(wordCounts[count]);
  }

  return {
    fileName,
    text,
    wordCounts,
    numTotalWords,
    numDistinctWords,
    excludeStopWords
  };
};

const isAlphaNumeric = char => {
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(char); //allows for alphanumerical words including diacritics, all other characters are considered word delimiters
};

const endsWithSilentE = word => {
  return /([aeiou][b-df-hj-np-tv-xz])|([b-df-hj-np-tv-xz][cg])/.test(
    //tests for word stems ending in (vowel)(consonant) or (vowel)(consonant)(c) or (vowel)(consonant)(g)
    word.slice(word.length - 2)
  );
};

const endsWithDoubleConsonant = word => {
  return /([bdgmnprst])\1/.test(word.slice(word.length - 2));
};

const getRootWord = word => {
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
      if (endsWithDoubleConsonant(word.slice(0, length - 2))) {
        return word.slice(0, length - 3);
      } else if (endsWithSilentE(word.slice(0, length - 2))) {
        return word.slice(0, length - 2).concat("e");
      } else {
        return word.slice(0, length - 2);
      }
    }
  }
  if (length >= 3) {
    if (word[length - 1] === "s" && word[length - 2] !== "s") {
      return word.slice(0, length - 1);
    }
  }
  return word;
};
