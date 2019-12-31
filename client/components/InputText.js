import React from "react";
import analyzeText from "../util/analyzeText"

class InputText extends React.Component {
  constructor() {
    super() 
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const excludeStopWords = e.target.excludeStopWords.checked
    console.log(excludeStopWords)
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result
      const textAnalysis = analyzeText(text, excludeStopWords)
    }
    reader.readAsText(e.target.file.files[0])
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input name='file' type="file" />
          <div>
          <label htmlFor='excludeStopWords'>Exclude common English words</label>
          <input name='excludeStopWords' type='checkbox' />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default InputText;
