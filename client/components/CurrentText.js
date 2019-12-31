import React from "react";
import { connect } from "react-redux";

const CurrentText = props => {
  const {
    fileName,
    createdAt,
    excludeStopWords,
    numTotalWords,
    numDistinctWords,
    wordCounts,
    text
  } = props.currentText;
  const wordCountsArray = wordCounts?Object.keys(wordCounts).sort(descNumSort):[];
  return Object.keys(props.currentText).length ? (
    <div>
      <h3 className="header">Text analysis</h3>
      <div className="section">
        <div>
          File name: <strong>{fileName}</strong>
        </div>
        <div>
          Analysis timestamp: <strong>{new Date(createdAt).toString()}</strong>
        </div>
        <div>
          Excluded common English words:{" "}
          <strong>{excludeStopWords.toString()}</strong>
        </div>
      </div>
      <div className="section">
        <div>
          # total words: <strong>{numTotalWords}</strong>
        </div>
        <div>
          # distinct words: <strong>{numDistinctWords}</strong>
        </div>
      </div>
      <div className="section">
        {wordCountsArray.map((count, i) => {
          return wordCounts[count].map(word => {
            let rank= i+1
            return (
              <div key={word}>
                {rank}. <strong>{word}</strong> - count: <em>{count}</em>
              </div>
            );
          });
        })}
      </div>
      <div className="section">
        <div>Full text:</div>
        <div>
          <em>{text}</em>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const descNumSort = (A, B) => {
  return +A < +B ? 1 : -1;
};

const mapStateToProps = ({ currentText }) => ({ currentText });

export default connect(mapStateToProps)(CurrentText);
