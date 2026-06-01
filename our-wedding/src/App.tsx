import { useEffect, useState } from 'react'
import MainScreen from './components/MainScreen'
import OpeningScreen from './components/OpeningScreen'

function App() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyTouchAction = body.style.touchAction

    if (!accepted) {
      html.style.overflow = 'hidden'
      body.style.overflow = 'hidden'
      body.style.touchAction = 'none'
    }

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.touchAction = prevBodyTouchAction
    }
  }, [accepted])

  return (
    <>
      <MainScreen />

      {!accepted && (
        <OpeningScreen accepted={accepted} onAccept={() => setAccepted(true)} />
      )}
    </>
  )
}

export default App