import React from "react";

import { Navbar, InputText, CurrentText, PrevTexts } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <div id='content'>
        <div id='inputAreas'>
          <InputText />
          <PrevTexts />
        </div>
        <div id='currentText'>
           <CurrentText />
        </div>
      </div>
    </div>
  );
};

export default App;
