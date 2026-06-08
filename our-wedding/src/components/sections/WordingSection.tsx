import { motion, useReducedMotion } from 'framer-motion'
import './WordingSection.css'

type WordingSectionProps = {
  id?: string
}

export default function WordingSection({ id = 'wording' }: WordingSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  return (
    <section className="section wording-section" id={id}>
      <motion.div
        className="card invitation"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        transition={sectionTransition}
      >
        <div className="invitation-head">
          <div className="invitation-kicker">INVITATION</div>
          <div className="invitation-sub">💌</div>
        </div>

        <div className="invitation-body">
          <p>
            저희, 결혼합니다.
          </p>
          <p>
            같은 나이, 같은 계절을 지나며<br></br>
            서로의 가장 좋은 친구가 된 저희가 <span className="nowrap">이제는 평생을 함께할 가족이 되려 합니다.</span>
          </p>
          <p>
            <span className="nowrap">소중한 분들과 기쁜 순간을 나누고 싶습니다.</span>
            <br></br>
            바쁘신 걸음 잠시 내어 축복해 주신다면 <span className="nowrap">더없이 행복하겠습니다.</span>
          </p>          
        </div>

        <div className="invitation-family">
          <div className="family-line">
            박태식 · 성숙진의 아들 박윤수
          </div>
          <div className="family-line">
            김대홍 · 김미경의 딸 김서현
          </div>
        </div>

        {/* <button
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
              <div className="contact-name">박윤수</div>
              <a className="contact-link" href="tel:010-2217-9743">
                010-2217-9743
              </a>
            </div>
            <div className="contact-card">
              <div className="contact-role">신부</div>
              <div className="contact-name">김서현</div>
              <a className="contact-link" href="tel:010-2743-0705">
                010-2743-0705
              </a>
            </div>
          </div>
        </div> */}

        {/* <div className="invitation-footer">
          <div>2026년 8월 29일 토요일 오후 1시 40분</div>
          <div>경기도 광명시 양지로 17 아이벡스 컨벤션</div>
        </div> */}
      </motion.div>
    </section>
  )
}
