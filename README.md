# FlareCodingChallenge

## How to Use
Clone the repo to your machine. Make sure you have PostgreSQL running on your machine and create a database called FlareCodingChallenge. If you have psql installed globally you can simply run
```
createdb FlareCodingChallenge
```
from the terminal. 
Install dependencies by running
```
npm install
```
Build the webpack bundle by running
```
npm run build-client
```
Start the server by running
```
npm start
```
You can access the web app at localhost:8080

## Overview of solution
### Prompt
The prompt was to create a web application that could perform a persistent word count analysis on a user-uploaded text document. I started by constructing a SPA boilerplate using Node.js on the backend running Express.js for the server and Sequelize.js as an ORM framework connecting to a PostgreSQL database. On the frontend, I used React components for an interactive DOM, Redux for state management, React-Redux to connect my React components to the store, Redux-Thunk to perform async requests to the server to update state, and Axios to send HTTP requests. 

### Front End
I felt the prompt was perfect for a front-to-back approach. I started by creating a component, <InputText/>, that accepts a file and allows you to choose whether you want to exclude common English words. An error message is shown if the file extension is not .txt. On submission, the file is converted to a string by FileReader, and then passed to analyzeText(). The text analysis takes place on the client's computer, rather than the server, to prevent server overload. The results of the analysis are then sent to the server to be stored on the database. When the app loads, a React component lifecycle method, componentDidMount(), runs that fetches the filename and timestamp of the most recent 10 analyses from the database. If the user clicks on one of the previous analyses, a thunk is dispatched that fetches the complete text analysis from the database, updates the app state currentText, and displays the analysis in <CurrentText/> 

### Text Analysis
analyzeText() initiates two pointers that scan along the text, using isAlphaNumeric() to determine whether the current character acts as a word delimiter. isAlphaNumeric() allows for detection of alphanumeric words that may contain diacritics, making the text analysis very generalizable and multi-purpose. The words are also made lowercase so it is case-insensitive.
When a word is detected, it is passed to getRootWord(), which removes some common English suffixes and returns the root word. I spent a fair amount of time on getRootWord(). I was able to pass all the provided test cases fairly quickly, but I'm a grammar nut and couldn't let some of the other common cases slip by (doubling final consonants - run>running, silent E's - time>timing). If the user has chosen to exclude common English words, those words will be ignored. 
Once we have isolated the root word, we use it index into a hashmap to augment the word count. I had initially implemented a trie to hold the word counts, but since we are just doing simple lookups, and not any complex prefix/suffix analysis, and since the number of English word roots is relatively small (~100,000) so hash collisions should be rare, I thought a hashmap was more readable and possibly more space-efficient.  
Once we have the word count, we pass the word and its word count into TopWords, an ADT that stores the most frequent words. TopWords stores at least N=25 words when it is full, but can store more words if some of the word counts are tied. Allowing for ties made the code slightly more complex. TopWords main data structure is an object the maps the most frequent word counts (keys) to a Set of words at that word count (value) (ex. {1: Set(['hello', 'goodbye']), 2: Set(['cool'])} for the text: 'hello goodbye cool cool')
Once the text has been analyzed a thunk is dispatched that sends the results to the server and saves it to the database. Once it is saved to the database, the app state currentText is updated with the new text analysis and it is displayed in the component <CurrentText/>. We also add the new analysis to the app state prevTexts, which is displayed in the component <PrevTexts/>.

### Back End
Once I had the front end and text analysis working, I created my REST API routes and database models. I wrote routes for fetching all text analyses (only returns the filename and the timestamp, since I thought the full texts might be very long and we wouldn't want to store all of the full texts on the client's browser), posting a new text analysis (this also deletes the most remote text analysis, such that there are only ever 10 analyses stored in the database), and fetching full text analysis by id. I also wrote my database model which stores the filename (string), full text (long string), wordCounts (JSON), numTotalWords (integer), numDistinctWords (integer), and excludeStopWords (Boolean).