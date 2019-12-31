import React from "react";

import { Navbar, InputText, CurrentText, PrevTexts } from "./components";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        <div style={{display: 'flex', flexDirection: 'column', margin: '10px'}}>
          <InputText />
          <PrevTexts />
        </div>
        <div style={{margin: '10px'}}>
           <CurrentText />
        </div>
      </div>
    </div>
  );
};

export default App;
