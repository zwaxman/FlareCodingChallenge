# FlareCodingChallenge

Need to initiate db
Need to have postgres running
npm install

Go through the frameworks you used

Some assumptions
Wanted to be able separate words very generally with support for diacritics and words that are alphanumeric. Used regex /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/ to see if character is alphanumeric. All other characters act as word delimiters. 
Words are made lowercase, so that the word count is case-insensitive
