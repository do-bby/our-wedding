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
    <section className="section profile-section" id={id}>
      <motion.div
        className="card profile-section-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <div className="profiles">
          <div className="profile">
            <img className="profile-avatar profile-avatar--groom" src={yoonsooImage} alt="신랑 윤수" />
            <div className="profile-line">
              <span className="profile-role">신랑</span>
              <span className="profile-name">윤수</span>
            </div>
            <div className="profile-tagline">#공감왕 #집돌이<br></br>#계획대론못살아</div>
          </div>

          <div className="profiles-emoji" aria-hidden="true">🤵‍♂️💍👰‍♀️</div>

          <div className="profile">
            <img className="profile-avatar profile-avatar--bride" src={seohyunImage} alt="신부 서현" />
            <div className="profile-line">
              <span className="profile-role">신부</span>
              <span className="profile-name">서현</span>
            </div>
            <div className="profile-tagline">#윤수한정T #콩순바라기<br></br>#계획없이못살아</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
