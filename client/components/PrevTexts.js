import React from "react";
import { connect } from "react-redux";
import { fetchPrevTexts } from "../store/prevTexts";
import { fetchCurrentText } from "../store/currentText";

class PrevTexts extends React.Component {
  componentDidMount() {
    this.props.fetchPrevTexts();
  }

  render() {
    const { prevTexts, currentText, fetchCurrentText } = this.props;
    return (
      <div>
        <h3 className="header">Select previously analyzed .txt file</h3>
        {prevTexts.map(prevText => (
          <div
            key={prevText.id}
            onClick={() => fetchCurrentText(prevText.id)}
            className="prevText"
            style={{ color: currentText.id === prevText.id ? "blue" : "black" }}
          >
            <div>{prevText.fileName}</div>{" "}
            <div>{new Date(prevText.createdAt).toString()}</div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ prevTexts, currentText }) => ({
  prevTexts,
  currentText
});
const mapDispatchToProps = { fetchPrevTexts, fetchCurrentText };

export default connect(mapStateToProps, mapDispatchToProps)(PrevTexts);
