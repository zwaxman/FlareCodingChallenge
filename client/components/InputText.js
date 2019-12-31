import React from "react";
import analyzeText from "../util/analyzeText";
import { connect } from "react-redux";
import { postCurrentText } from "../store/currentText";

class InputText extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { message: "" };
  }

  onSubmit(e) {
    e.preventDefault();
    const fileName = e.target.file.files[0].name;
    if (fileName.slice(fileName.length - 3) !== "txt") {
      return this.setState({ message: "Only accepts .txt files" });
    } else {
      this.setState({ message: "" });
    }
    const excludeStopWords = e.target.excludeStopWords.checked;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const textAnalysis = analyzeText(fileName, text, excludeStopWords);
      this.props.postCurrentText(textAnalysis);
    };
    reader.readAsText(e.target.file.files[0]);
  }

  render() {
    return (
      <div>
        <h3 className="header">Submit new .txt file for analysis</h3>
        <form onSubmit={this.onSubmit}>
          <input name="file" type="file" />
          <p>{this.state.message}</p>
          <div>
            <input name="excludeStopWords" type="checkbox" />
            <label htmlFor="excludeStopWords">
              Exclude common English words
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <hr />
      </div>
    );
  }
}

const mapDispatchToProps = { postCurrentText };

export default connect(null, mapDispatchToProps)(InputText);
