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
  return Object.keys(props.currentText).length ? (
    <div>
      <div>
        <div>File name: <strong>{fileName}</strong></div>
        <div>Analysis timestamp: <strong>{createdAt}</strong></div>
        <div>Excluded common English words: <strong>{excludeStopWords.toString()}</strong></div>
      </div>
      <div>
        <div># total words: <strong>{numTotalWords}</strong></div>
        <div># distinct words: <strong>{numDistinctWords}</strong></div>
      </div>
      <div>
        {Object.keys(wordCounts)
          .sort(descNumSort)
          .map((count, i) => {
            let rank = i + 1;
            return wordCounts[count].map(word => {
              return (
                <div key={word}>
                  {rank}. <strong>{word}</strong> - count: <em>{count}</em>
                </div>
              );
            });
          })}
      </div>
      <div>
        <div>Full text:</div>
        <div><em>{text}</em></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

const descNumSort = (A, B) => {
  return A > B ? 1 : -1;
};

const mapStateToProps = ({ currentText }) => ({ currentText });

export default connect(mapStateToProps)(CurrentText);
