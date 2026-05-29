import { motion, useReducedMotion } from 'framer-motion'

type CalendarSectionProps = {
  id?: string
}

export default function CalendarSection({ id = 'calendar' }: CalendarSectionProps) {
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
    <section className="section" id={id}>
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
  )
}
