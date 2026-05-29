import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './App.css'

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [showAirdrop, setShowAirdrop] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setShowAirdrop(true), 1600)
    return () => window.clearTimeout(t)
  }, [])

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  return (
    <>
      {!accepted && (
        <div className="opening" aria-hidden={accepted}>
          <div className="opening-bg" />

          <motion.div
            className="opening-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={sectionTransition}
          >
            <div className="opening-line">Our Wedding</div>
            <div className="opening-sub">Mobile Invitation</div>
          </motion.div>

          <motion.div
            className="airdrop"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={showAirdrop ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
            transition={sectionTransition}
            role="dialog"
            aria-label="AirDrop"
          >
            <div className="airdrop-header">AirDrop</div>
            <div className="airdrop-body">
              <div className="airdrop-avatar" aria-hidden="true" />
              <div className="airdrop-text">
                <div className="airdrop-title">Wedding Invitation</div>
                <div className="airdrop-meta">From: Someone Nearby</div>
              </div>
            </div>
            <div className="airdrop-actions">
              <button
                type="button"
                className="btn ghost"
                onClick={() => setShowAirdrop(false)}
              >
                Decline
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={() => setAccepted(true)}
              >
                Accept
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <main className="shell" aria-hidden={!accepted}>
        <header className="topbar">
          <div className="topbar-title">Our Wedding</div>
          <nav className="topbar-nav">
            <a href="#wording">초대</a>
            <a href="#calendar">날짜</a>
            <a href="#profile">프로필</a>
            <a href="#timeline">타임라인</a>
          </nav>
        </header>

        <section className="section hero" id="home">
          <motion.div
            className="card hero-card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={sectionTransition}
          >
            <div className="hero-kicker">scroll to unlock</div>
            <h1 className="hero-title">Summer Wedding</h1>
            <div className="hero-sub">
              여름의 공기처럼 가볍고 시원한 분위기의 모바일 청첩장 템플릿
            </div>
            <div className="hero-hint">아래로 스크롤 해주세요</div>
          </motion.div>
        </section>

        <section className="section" id="wording">
          <motion.div
            className="card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={sectionTransition}
          >
            <h2 className="section-title">초대 문구</h2>
            <p className="body">
              햇살이 길어지는 계절, 서로의 하루를 함께하기로 했습니다. 소중한 분과
              함께 기쁨을 나누고 싶습니다.
            </p>
          </motion.div>
        </section>

        <section className="section" id="calendar">
          <motion.div
            className="card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={sectionTransition}
          >
            <h2 className="section-title">캘린더</h2>
            <div className="calendar">
              <div className="calendar-row">
                <div className="calendar-label">DATE</div>
                <div className="calendar-value">2026. 08. 15 (SAT)</div>
              </div>
              <div className="calendar-row">
                <div className="calendar-label">TIME</div>
                <div className="calendar-value">PM 1:00</div>
              </div>
              <div className="calendar-row">
                <div className="calendar-label">PLACE</div>
                <div className="calendar-value">서울 어딘가 웨딩홀</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section" id="profile">
          <motion.div
            className="card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={sectionTransition}
          >
            <h2 className="section-title">About Us</h2>
            <div className="profiles">
              <div className="profile">
                <div className="profile-avatar" aria-hidden="true" />
                <div className="profile-name">Groom</div>
                <div className="profile-role">신랑</div>
              </div>
              <div className="profile">
                <div className="profile-avatar" aria-hidden="true" />
                <div className="profile-name">Bride</div>
                <div className="profile-role">신부</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section" id="timeline">
          <motion.div
            className="card"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={sectionTransition}
          >
            <h2 className="section-title">Timeline</h2>
            <div className="timeline">
              <div className="event">
                <div className="event-dot" aria-hidden="true" />
                <div className="event-body">
                  <div className="event-date">2024</div>
                  <div className="event-text">처음 만난 날</div>
                </div>
              </div>
              <div className="event">
                <div className="event-dot" aria-hidden="true" />
                <div className="event-body">
                  <div className="event-date">2025</div>
                  <div className="event-text">함께한 여행들</div>
                </div>
              </div>
              <div className="event">
                <div className="event-dot" aria-hidden="true" />
                <div className="event-body">
                  <div className="event-date">2026</div>
                  <div className="event-text">그리고 결혼</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <footer className="footer">© Our Wedding</footer>
      </main>
    </>
  )
}

export default App
