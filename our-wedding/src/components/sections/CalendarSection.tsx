import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import './CalendarSection.css'

type CalendarSectionProps = {
  id?: string
}

export default function CalendarSection({ id = 'calendar' }: CalendarSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const target = useMemo(() => new Date(2026, 7, 29, 13, 40, 0), [])
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(t)
  }, [])

  const { days, hours, minutes, seconds } = useMemo(() => {
    const diff = Math.max(0, target.getTime() - now.getTime())
    const totalSeconds = Math.floor(diff / 1000)
    const d = Math.floor(totalSeconds / 86400)
    const h = Math.floor((totalSeconds % 86400) / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return { days: d, hours: h, minutes: m, seconds: s }
  }, [now, target])

  const monthMatrix = useMemo(() => {
    const year = target.getFullYear()
    const month = target.getMonth()
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    const startDay = first.getDay()
    const totalDays = last.getDate()

    const cells: Array<number | null> = []
    for (let i = 0; i < startDay; i += 1) cells.push(null)
    for (let d = 1; d <= totalDays; d += 1) cells.push(d)
    while (cells.length % 7 !== 0) cells.push(null)
    return { year, month, cells }
  }, [target])

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
        {/* <h2 className="section-title">캘린더</h2> */}
        <div className="calendar-wrap">
          <div className="calendar-card" role="group" aria-label="Wedding Calendar">
            <div className="calendar-top">
              {/* <div className="calendar-top-center">{monthMatrix.year}</div> */}
              <div className="calendar-top-center">{monthMatrix.year}년</div>
              {/* <div className="calendar-top-right">+</div> */}
            </div>

            <div className="calendar-month">
              {new Date(monthMatrix.year, monthMatrix.month, 1).toLocaleString('ko-KR', {
                month: 'long',
              })}
            </div>

            <div className="calendar-weekdays" aria-hidden="true">
              <div className="calendar-weekday sun">일</div>
              <div className="calendar-weekday">월</div>
              <div className="calendar-weekday">화</div>
              <div className="calendar-weekday">수</div>
              <div className="calendar-weekday">목</div>
              <div className="calendar-weekday">금</div>
              <div className="calendar-weekday">토</div>
            </div>

            <div className="calendar-grid" role="grid" aria-label="Month days">
              {monthMatrix.cells.map((d, idx) => {
                const isTarget = d != null && d === target.getDate()
                return (
                  <div
                    key={`${idx}-${d ?? 'x'}`}
                    className={isTarget ? 'calendar-day is-target' : 'calendar-day'}
                    role="gridcell"
                    aria-selected={isTarget}
                  >
                    <span>{d}</span>
                    {isTarget ? <span className="calendar-day-time">13:40</span> : null}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="dday-text">함께할 설렘까지</div>
          <div className="dday" role="group" aria-label="D-day Countdown">
            <div className="dday-item">
              <div className="dday-label">DAYS</div>
              <div className="dday-value">{days}</div>
            </div>
            <div className="dday-item">
              <div className="dday-label">HOUR</div>
              <div className="dday-value">{hours}</div>
            </div>
            <div className="dday-item">
              <div className="dday-label">MIN</div>
              <div className="dday-value">{minutes}</div>
            </div>
            <div className="dday-item">
              <div className="dday-label">SEC</div>
              <div className="dday-value">{seconds}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
