import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import Particles from '../ui/Particles'
import styles from './HeroScreen.module.css'

// Animated text that reveals word by word
function RevealText({ text, delay = 0, className }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={styles.word}
          initial={{ opacity: 0, y: 28, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.9,
            delay: delay + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </span>
  )
}

export default function HeroScreen({ onEnter }) {
  const [phase, setPhase] = useState('intro') // intro | ready
  const containerRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallax layers
  const layer1X = useTransform(mouseX, [-1, 1], [-18, 18])
  const layer1Y = useTransform(mouseY, [-1, 1], [-12, 12])
  const layer2X = useTransform(mouseX, [-1, 1], [-8, 8])
  const layer2Y = useTransform(mouseY, [-1, 1], [-5, 5])

  useEffect(() => {
    // After initial animations settle, mark as ready
    const t = setTimeout(() => setPhase('ready'), 2400)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width * 2 - 1)
    mouseY.set((e.clientY - rect.top) / rect.height * 2 - 1)
  }

  return (
    <div
      ref={containerRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
    >
      {/* Particles layer */}
      <Particles />

      {/* Background parallax lights */}
      <motion.div
        className={styles.lightOrb1}
        style={{ x: layer1X, y: layer1Y }}
      />
      <motion.div
        className={styles.lightOrb2}
        style={{ x: layer2X, y: layer2Y }}
      />

      {/* Vignette */}
      <div className={styles.vignette} />

      {/* Central content */}
      <div className={styles.content}>

        {/* Top eyebrow */}
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.22em' }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        >
          solo para ti
        </motion.p>

        {/* Main headline */}
        <h1 className={styles.headline} style={{ perspective: 800 }}>
          <RevealText text="Tengo algo" delay={0.6} className={styles.lineNormal} />
          <br />
          <RevealText text="que proponerte" delay={1.1} className={styles.lineItalic} />
        </h1>

        {/* Decorative line */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 2.0, ease: [0.87, 0, 0.13, 1] }}
        />

        {/* CTA */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.button
              className={styles.ctaBtn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onClick={onEnter}
              whileTap={{ scale: 0.96 }}
            >
              <span className={styles.ctaText}>Abrir</span>
              <span className={styles.ctaArrow}>↓</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom date hint */}
        <motion.p
          className={styles.hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1, delay: 3.2 }}
        >
          ✦ Este domingo ✦
        </motion.p>
      </div>
    </div>
  )
}
