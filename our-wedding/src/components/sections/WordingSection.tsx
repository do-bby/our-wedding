import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import './WordingSection.css'

type WordingSectionProps = {
  id?: string
}

export default function WordingSection({ id = 'wording' }: WordingSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [showContacts, setShowContacts] = useState(false)

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  return (
    <section className="section" id={id}>
      <motion.div
        className="card invitation"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <div className="invitation-head">
          <div className="invitation-kicker">INVITATION</div>
          <div className="invitation-sub">초대합니다</div>
        </div>

        <div className="invitation-body">
          <p>
            따뜻한 봄날,
            <br />
            서로의 손을 맞잡고
            <br />
            평생을 함께하기로 약속했습니다.
          </p>
          <p>
            서로에게 가장 큰 위로이자
            <br />
            기쁨이 되어줄 두 사람이
            <br />
            이제 하나의 길을 걸어가려 합니다.
          </p>
          <p>
            소중한 걸음 하시어
            <br />
            저희의 시작을 함께 축복해 주세요.
          </p>
        </div>

        <div className="invitation-family">
          <div className="family-line">
            김영수 · 박미경의 장남 <b>김민준</b>
          </div>
          <div className="family-line">
            이정호 · 최은주의 장녀 <b>이서연</b>
          </div>
        </div>

        <button
          type="button"
          className="phone-fab"
          aria-expanded={showContacts}
          aria-controls="contact-panel"
          onClick={() => setShowContacts(v => !v)}
        />

        <div
          id="contact-panel"
          className={showContacts ? 'contact-panel is-open' : 'contact-panel'}
        >
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-role">신랑</div>
              <div className="contact-name">김민준</div>
              <a className="contact-link" href="tel:010-3333-4444">
                010-3333-4444
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-role">신부</div>
              <div className="contact-name">이서연</div>
              <a className="contact-link" href="tel:010-9876-5432">
                010-9876-5432
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-role">혼주</div>
              <div className="contact-name">김영수</div>
              <a className="contact-link" href="tel:010-5555-6666">
                010-5555-6666
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-role">혼주</div>
              <div className="contact-name">이정호</div>
              <a className="contact-link" href="tel:010-1111-2222">
                010-1111-2222
              </a>
            </div>
          </div>
        </div>

        <div className="invitation-footer">
          <div>2026년 8월 29일 토요일 오후 1시 40분</div>
          <div>대구 파라다이스 웨딩컨벤션 그랜드홀</div>
        </div>
      </motion.div>
    </section>
  )
}
