import { motion, useReducedMotion } from 'framer-motion'
import seohyunImage from '../../images/seohyun.png'
import yoonsooImage from '../../images/yoonsoo.png'
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
            <img className="profile-avatar" src={yoonsooImage} alt="신랑 윤수" />
            <div className="profile-line">
              <span className="profile-role">Groom</span>
              <span className="profile-name">윤수</span>
            </div>
            <div className="profile-tagline">#신랑 #윤수</div>
          </div>
          <div className="profile">
            <img className="profile-avatar" src={seohyunImage} alt="신부 서현" />
            <div className="profile-line">
              <span className="profile-role">Bride</span>
              <span className="profile-name">서현</span>
            </div>
            <div className="profile-tagline">#신부 #서현</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
