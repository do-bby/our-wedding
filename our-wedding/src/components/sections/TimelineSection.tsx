import { motion, useReducedMotion } from 'framer-motion'

type TimelineSectionProps = {
  id?: string
}

export default function TimelineSection({ id = 'timeline' }: TimelineSectionProps) {
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
  )
}
