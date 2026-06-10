import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import airDropImage from '../images/airDrop.png'
import './OpeningScreen.css'

type OpeningScreenProps = {
  accepted: boolean
  onAccept: () => void
}

export default function OpeningScreen({ accepted, onAccept }: OpeningScreenProps) {
  const prefersReducedMotion = useReducedMotion()
  const [showAirdrop, setShowAirdrop] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setShowAirdrop(true), 1600)
    return () => window.clearTimeout(t)
  }, [])

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  return (
    <div className="opening" aria-hidden={accepted}>
      {showAirdrop && <div className="opening-blur" aria-hidden="true" />}

      <motion.div
        className="airdrop"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={showAirdrop ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
        transition={sectionTransition}
        role="dialog"
        aria-label="AirDrop"
      >
        <div className="airdrop-header">AirDrop</div>
        <div className="airdrop-message">🌻윤수 그리고 서현의 결혼식에 초대합니다.🌻</div>
        <div className="airdrop-preview" aria-hidden="true">
          <img className="airdrop-preview-img" src={airDropImage} alt="" />
        </div>
        <div className="airdrop-actions">
          <button
            type="button"
            className="airdrop-action"
            onClick={() => setShowAirdrop(false)}
          >
            거절
          </button>
          <button type="button" className="airdrop-action" onClick={onAccept}>
            수락
          </button>
        </div>
      </motion.div>

    </div>
  )
}
