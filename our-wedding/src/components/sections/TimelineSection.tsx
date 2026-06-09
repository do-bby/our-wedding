import { motion, useReducedMotion } from 'framer-motion'
import './TimelineSection.css'
import coverImage from '../../images/cover.png'

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

  const items = [
    {
      title: '2022년 10월',
      subtitle: '처음 만난 날',
      body: '서로의 하루에 조용히 스며든 첫 순간을 기억해요.',
      image: coverImage,
    },
    {
      title: '만난지 1주년',
      subtitle: '',
      body: '서로의 계절을 함께 걸으며 평범한 일상이 특별해졌어요.',
      image: coverImage,
    },
    {
      title: '만난지 2주년',
      subtitle: '',
      body: '우리의 하루가 쌓여 더 단단해졌고, 앞으로의 시간을 약속했어요.',
      image: coverImage,
    },
    {
      title: '만난지 3주년',
      subtitle: '♥',
      body: '이제 하나의 길을 걸어가려 합니다. 따뜻한 축복과 함께해 주세요.',
      image: coverImage,
    },
  ]

  return (
    <section className="section timeline-section" id={id}>
      <motion.div
        className="card timeline-section-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <h2 className="section-title">TIME LINE</h2>
        <div className="timeline-alt" role="list">
          {items.map((it, idx) => (
            <div
              key={`${it.title}-${idx}`}
              className={idx % 2 === 0 ? 'timeline-item left' : 'timeline-item right'}
              role="listitem"
            >
              <div className="timeline-spine" aria-hidden="true">
                <div className="timeline-heart" />
              </div>
              <div className="timeline-card">
                <div className="timeline-photo" aria-hidden="true">
                  <img className="timeline-photo-img" src={it.image} alt="" />
                </div>
                <div className="timeline-title">
                  {it.title}
                  {it.subtitle ? <span className="timeline-sub"> {it.subtitle}</span> : null}
                </div>
                <div className="timeline-body">{it.body}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
