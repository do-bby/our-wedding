import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

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
      <div className="opening-bg" />

      <motion.div
        className="opening-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={sectionTransition}
      >
        <div className="opening-line">Our Wedding</div>
        <div className="opening-sub">Mobile Invitation</div>
      </motion.div>

      <motion.div
        className="airdrop"
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={showAirdrop ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
        transition={sectionTransition}
        role="dialog"
        aria-label="AirDrop"
      >
        <div className="airdrop-header">AirDrop</div>
        <div className="airdrop-body">
          <div className="airdrop-avatar" aria-hidden="true" />
          <div className="airdrop-text">
            <div className="airdrop-title">Wedding Invitation</div>
            <div className="airdrop-meta">From: Someone Nearby</div>
          </div>
        </div>
        <div className="airdrop-actions">
          <button
            type="button"
            className="btn ghost"
            onClick={() => setShowAirdrop(false)}
          >
            Decline
          </button>
          <button type="button" className="btn primary" onClick={onAccept}>
            Accept
          </button>
        </div>
      </motion.div>
    </div>
  )
}
