import { motion, useReducedMotion } from 'framer-motion'

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
    <section className="section" id={id}>
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
          햇살이 길어지는 계절, 서로의 하루를 함께하기로 했습니다. 소중한 분과 함께
          기쁨을 나누고 싶습니다.
        </p>
      </motion.div>
    </section>
  )
}
