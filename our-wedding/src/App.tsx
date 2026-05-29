import { useState } from 'react'
import MainScreen from './components/MainScreen'
import OpeningScreen from './components/OpeningScreen'

function App() {
  const [accepted, setAccepted] = useState(false)

  return (
    <>
      {!accepted && (
        <OpeningScreen accepted={accepted} onAccept={() => setAccepted(true)} />
      )}

      <div aria-hidden={!accepted}>
        <MainScreen />
      </div>
    </>
  )
}

export default App