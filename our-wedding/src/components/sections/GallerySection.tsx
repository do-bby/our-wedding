import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import './GallerySection.css'

import galleryImage1 from '../../images/1.jpg'
import galleryImage2 from '../../images/2.jpg'
import galleryImage3 from '../../images/3.jpg'
import galleryImage4 from '../../images/4.jpg'
import galleryImage5 from '../../images/5.jpg'
import galleryImage6 from '../../images/6.jpg'
import galleryImage7 from '../../images/7.jpg'
import galleryImage8 from '../../images/8.jpg'
import galleryImage9 from '../../images/9.jpg'
import galleryImage10 from '../../images/10.jpg'
import galleryImage11 from '../../images/11.jpg'
import galleryImage12 from '../../images/12.jpg'
import galleryImage13 from '../../images/13.jpg'
import galleryImage14 from '../../images/14.png'
import galleryImage15 from '../../images/15.png'
import galleryImage16 from '../../images/16.png'
import galleryImage17 from '../../images/17.png'
import galleryImage18 from '../../images/18.png'

type GallerySectionProps = {
  id?: string
  images?: string[]
  initialVisibleCount?: number
}

export default function GallerySection({
  id = 'gallery',
  images,
  initialVisibleCount = 9,
}: GallerySectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [touchStartedOnControl, setTouchStartedOnControl] = useState(false)

  const galleryImages = useMemo(() => {
    if (images && images.length > 0) return images
    return [
      galleryImage1,
      galleryImage2,
      galleryImage3,
      galleryImage4,
      galleryImage5,
      galleryImage6,
      galleryImage7,
      galleryImage8,
      galleryImage9,
      galleryImage10,
      galleryImage11,
      galleryImage12,
      galleryImage13,
      galleryImage14,
      galleryImage15,
      galleryImage16,
      galleryImage17,
      galleryImage18,
    ]
  }, [images])

  const visibleImages = useMemo(() => {
    if (expanded) return galleryImages
    return galleryImages.slice(0, initialVisibleCount)
  }, [expanded, galleryImages, initialVisibleCount])

  const openLightbox = (idx: number) => {
    setActiveIndex(idx)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  }

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % galleryImages.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxOpen, galleryImages.length])

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  const canToggle = galleryImages.length > initialVisibleCount

  return (
    <section className="section gallery-section" id={id}>
      <motion.div
        className="card gallery-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <div className="gallery-header">          
          <div className="gallery-subtitle">📸</div>
        </div>

        <div className="gallery-grid" role="list" aria-label="Gallery">
          {visibleImages.map((src, idx) => (
            <button
              key={`${idx}-${src}`}
              type="button"
              className="gallery-item"
              aria-label={`Gallery image ${idx + 1}`}
              onClick={() => openLightbox(idx)}
            >
              <span className="gallery-img-frame" style={{ backgroundImage: `url(${src})` }}>
                <img className="gallery-img" src={src} alt="" loading="lazy" />
              </span>
            </button>
          ))}
        </div>

        {canToggle ? (
          <button
            type="button"
            className="gallery-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <span className="gallery-more-text">{expanded ? '접기' : '더보기'}</span>
            <span className={expanded ? 'gallery-more-icon is-expanded' : 'gallery-more-icon'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ) : null}

        {lightboxOpen ? (
          <div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox()
            }}
          >
            <div
              className="gallery-lightbox-inner"
              onTouchStart={(e) => {
                const target = e.target as HTMLElement | null
                const startedOnControl = Boolean(target?.closest('button'))
                setTouchStartedOnControl(startedOnControl)
                if (startedOnControl) return
                setTouchStartX(e.touches[0]?.clientX ?? null)
                setTouchDeltaX(0)
              }}
              onTouchMove={(e) => {
                if (touchStartedOnControl) return
                if (touchStartX == null) return
                const x = e.touches[0]?.clientX ?? touchStartX
                setTouchDeltaX(x - touchStartX)
              }}
              onTouchEnd={() => {
                if (touchStartedOnControl) {
                  setTouchStartedOnControl(false)
                  setTouchStartX(null)
                  setTouchDeltaX(0)
                  return
                }
                const threshold = 60
                if (touchDeltaX > threshold) goPrev()
                if (touchDeltaX < -threshold) goNext()
                setTouchStartX(null)
                setTouchDeltaX(0)
                setTouchStartedOnControl(false)
              }}
            >
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={(e) => {
                  e.stopPropagation()
                  closeLightbox()
                }}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <button
                type="button"
                className="gallery-lightbox-nav is-prev"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                aria-label="Previous"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="gallery-lightbox-stage">
                <img className="gallery-lightbox-img" src={galleryImages[activeIndex]} alt="" draggable={false} />
              </div>

              <button
                type="button"
                className="gallery-lightbox-nav is-next"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                aria-label="Next"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="gallery-lightbox-count">
                {activeIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        ) : null}
      </motion.div>
    </section>
  )
}
