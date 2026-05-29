import { motion, useReducedMotion } from 'framer-motion'
import './HeroSection.css'

type HeroSectionProps = {
  id?: string
}

export default function HeroSection({ id = 'home' }: HeroSectionProps) {
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
    <section className="section hero" id={id}>
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
  )
}
