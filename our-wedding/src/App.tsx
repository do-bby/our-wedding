import { useEffect, useRef, useState } from 'react'
import MainScreen from './components/MainScreen'
import OpeningScreen from './components/OpeningScreen'
import './App.css'

import airDropImage from './images/airDrop.png'
import bgm from './bgm/SummerBGM.mp3'
import coverImage from './images/cover.png'
import seohyunImage from './images/seohyun.png'
import yoonsooImage from './images/yoonsoo.png'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [assetsReady, setAssetsReady] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bgm)
      audioRef.current.loop = true
      audioRef.current.volume = 0.45
    }

    return audioRef.current
  }

  const playMusic = () => {
    getAudio()
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false))
  }

  const toggleMusic = () => {
    const audio = getAudio()

    if (audio.paused) {
      playMusic()
      return
    }

    audio.pause()
    setIsMusicPlaying(false)
  }

  const acceptInvitation = () => {
    setAccepted(true)
    playMusic()
  }

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

  useEffect(() => {
    let cancelled = false

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.src = src
      })

    const start = performance.now()

    Promise.allSettled([
      preload(coverImage),
      preload(airDropImage),
      preload(seohyunImage),
      preload(yoonsooImage),
    ]).then(() => {
      const elapsed = performance.now() - start
      const minDuration = 350
      const waitMs = Math.max(0, minDuration - elapsed)

      window.setTimeout(() => {
        if (cancelled) return
        setAssetsReady(true)
      }, waitMs)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      {!assetsReady && (
        <div className="app-loader" role="status" aria-label="Loading">
          <div className="app-loader-spinner" aria-hidden="true" />
          <div className="app-loader-text">여름날의 초대장을 준비 중...</div>
        </div>
      )}

      <MainScreen isMusicPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />

      {!accepted && (
        <OpeningScreen accepted={accepted} onAccept={acceptInvitation} />
      )}
    </>
  )
}

export default App
