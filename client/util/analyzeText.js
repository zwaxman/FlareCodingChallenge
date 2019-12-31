export default text => {
  let indexStart = 0;
  let indexEnd = 0;
  while (indexEnd < text.length) {
    const char = text[indexEnd];
    if (!isAlpha(char)) {
      if (indexEnd - indexStart >= 1) {
        const word = text.slice(indexStart, indexEnd).toLowerCase();
        console.log(word);
      }
      indexStart = indexEnd + 1;
    }
    indexEnd++;
  }
  if (indexEnd - indexStart >= 1) {
    const word = text.slice(indexStart, indexEnd).toLowerCase();
    console.log(word);
  }
};

const isAlpha = char => {
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(char);
};
