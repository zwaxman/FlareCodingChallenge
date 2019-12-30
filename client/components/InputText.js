import React from "react";

class InputText extends React.Component {
  constructor() {
    super() 
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = () => {
      const text = reader.result
      console.log(text)
    }
    reader.readAsText(e.target.file.files[0])
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input name='file' type="file" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default InputText;
