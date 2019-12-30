import React from 'react'

import {Navbar, InputText, CurrentText, PrevTexts} from './components'

const App = () => {
  return (
    <div>
      <Navbar />
      <InputText />
      <CurrentText />
      <PrevTexts />
    </div>
  )
}

export default App