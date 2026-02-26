import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

// ── Fotos placeholder — sustitúyelas por las tuyas en /public/photos/
const PHOTOS = [
  { src: '/photos/photo1.png', alt: 'foto 1' },
  { src: '/photos/photo2.png', alt: 'foto 2' },
  { src: '/photos/photo3.png', alt: 'foto 3' },
  { src: '/photos/photo4.png', alt: 'foto 4' },
]

// Posiciones y rotaciones fijas para cada foto
const PHOTO_CONFIGS = [
  { x: '-8vw',  top: '8vh',  rotate: -6,  scale: 1.0,  delay: 0    },
  { x: '38vw',  top: '22vh', rotate:  8,  scale: 0.88, delay: 0.12 },
  { x: '-2vw',  top: '52vh', rotate: -4,  scale: 0.95, delay: 0.06 },
  { x: '42vw',  top: '68vh', rotate:  11, scale: 0.82, delay: 0.18 },
]

export default function Home() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const springProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  // Texto principal se va arriba al hacer scroll
  const heroY = useTransform(springProgress, [0, 0.35], ['0vh', '-25vh'])
  const heroOpacity = useTransform(springProgress, [0, 0.3], [1, 0])

  // CTA aparece en la parte baja del scroll
  const ctaOpacity = useTransform(springProgress, [0.55, 0.8], [0, 1])
  const ctaY = useTransform(springProgress, [0.55, 0.8], ['40px', '0px'])

  return (
    <div className={styles.page} ref={containerRef}>

      {/* ── Fondo leopardo fijo ── */}
      <div className={styles.leopardBg} aria-hidden />
      <div className={styles.bgOverlay} aria-hidden />

      {/* ── Fotos flotantes con scroll parallax ── */}
      {PHOTOS.map((photo, i) => (
        <FloatingPhoto
          key={i}
          photo={photo}
          config={PHOTO_CONFIGS[i]}
          scrollProgress={springProgress}
          index={i}
          total={PHOTOS.length}
        />
      ))}

      {/* ── Hero text — sticky al centro ── */}
      <div className={styles.heroWrap}>
        <motion.div className={styles.hero} style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            ✦ para ti ✦
          </motion.p>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            HOLA,<br />
            <span className={styles.heroItalic}>cariño</span>
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Esto es nuestro
          </motion.p>
        </motion.div>
      </div>

      {/* ── Scroll spacer — da altura para el scroll ── */}
      <div className={styles.scrollSpacer} />

      {/* ── CTA final — aparece al final del scroll ── */}
      <motion.div
        className={styles.ctaSection}
        style={{ opacity: ctaOpacity, y: ctaY }}
      >
        <p className={styles.ctaLabel}>¿Lista para ver qué tengo para ti?</p>
        <motion.button
          className={styles.ctaBtn}
          onClick={() => navigate('/citas')}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
        >
          Ver las citas →
        </motion.button>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>

    </div>
  )
}

// ── Foto individual con parallax ─────────────────────────────────────────────
function FloatingPhoto({ photo, config, scrollProgress, index, total }) {
  // Cada foto tiene una velocidad de parallax diferente
  const speed = 0.15 + index * 0.08
  const y = useTransform(scrollProgress, [0, 1], ['0px', `${-300 * speed}px`])

  // Aparece escalonada al inicio
  const appear = useTransform(
    scrollProgress,
    [index * 0.05, index * 0.05 + 0.15],
    [0, 1]
  )

  return (
    <motion.div
      className={styles.photoWrap}
      style={{
        y,
        left: config.x,
        top: config.top,
        rotate: config.rotate,
        scale: config.scale,
        opacity: appear,
        zIndex: index % 2 === 0 ? 2 : 3,
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.4 + config.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className={styles.photoImg}
        draggable={false}
      />
      {/* Sombra suave bajo cada foto */}
      <div className={styles.photoShadow} />
    </motion.div>
  )
}
