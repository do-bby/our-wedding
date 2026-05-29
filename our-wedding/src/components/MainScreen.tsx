import HeroSection from './sections/HeroSection'
import WordingSection from './sections/WordingSection'
import CalendarSection from './sections/CalendarSection'
import ProfileSection from './sections/ProfileSection'
import TimelineSection from './sections/TimelineSection'
import { useEffect, useMemo, useRef, useState } from 'react'
import coverImage from '../images/cover.png'
import './MainScreen.css'

export default function MainScreen() {
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const getScrollTop = () => {
      const se = document.scrollingElement
      if (se) return se.scrollTop
      return (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      )
    }

    const onScroll = () => {
      if (rafRef.current != null) return
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        setScrollY(getScrollTop())
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const intervalId = window.setInterval(() => {
      setScrollY(getScrollTop())
    }, 120)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.clearInterval(intervalId)
    }
  }, [])

  const unlockDistance = 240
  const progress = Math.min(1, Math.max(0, scrollY / unlockDistance))

  const overlayStyle = useMemo(() => {
    const translateY = -progress * 140
    const opacity = 1 - progress * 1.15
    return {
      transform: `translateX(-50%) translateY(${translateY}px)`,
      opacity: Math.max(0, opacity),
    }
  }, [progress])

  const isUnlocked = progress >= 1

  return (
    <main className="shell">
      <div
        className={
          isUnlocked ? 'lockscreen-overlay is-unlocked' : 'lockscreen-overlay'
        }
        style={overlayStyle}
        aria-hidden={isUnlocked}
      >
        <div className="lockscreen-inner" style={{ backgroundImage: `url(${coverImage})` }}>
          <div className="lockscreen-date">8월 29일 (토)</div>
          <div className="lockscreen-time">13:40</div>
{/* 
          <div className="lockscreen-hint">아래로 스크롤해 잠금해제</div> */}
        </div>
      </div>

      <div className={isUnlocked ? 'main-content is-unlocked' : 'main-content'}>
        {/* <header className="topbar">
          <div className="topbar-title">Our Wedding</div>
          <nav className="topbar-nav">
            <a href="#wording">초대</a>
            <a href="#calendar">날짜</a>
            <a href="#profile">프로필</a>
            <a href="#timeline">타임라인</a>
          </nav>
        </header> */}

        <HeroSection />
        <WordingSection />
        <CalendarSection />
        <ProfileSection />
        <TimelineSection />

        <footer className="footer">© Our Wedding</footer>
      </div>
    </main>
  )
}
