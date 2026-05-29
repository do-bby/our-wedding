import { motion, useReducedMotion } from 'framer-motion'
import './ProfileSection.css'

type ProfileSectionProps = {
  id?: string
}

export default function ProfileSection({ id = 'profile' }: ProfileSectionProps) {
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
  )
}
