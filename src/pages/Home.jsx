import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const containerRef = useRef(null)

  return (
    <div className={styles.page} ref={containerRef}>

      {/* ── SECCIÓN 1: Cover fullscreen ── */}
      <Section1 />

      {/* ── SECCIÓN 2: Intro texto cinematográfico ── */}
      <Section2 />

      {/* ── SECCIÓN 3: Citas — feature principal ── */}
      <Section3 onPress={() => navigate('/citas')} />

      {/* ── SECCIÓN 4: Próximamente ── */}
      <Section4 />

    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// SECCIÓN 1 — Cover fullscreen con tipografía enorme
// ────────────────────────────────────────────────────────────────────────────
function Section1() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section className={styles.s1} ref={ref}>
      {/* Background floral — posicionadas en esquinas */}
      <div className={styles.s1Floral}>
        <FloralCorner pos="tl" />
        <FloralCorner pos="br" />
      </div>

      <motion.div className={styles.s1Content} style={{ y, opacity }}>
        <motion.p
          className={styles.s1Eyebrow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          solo para ti
        </motion.p>

        <motion.h1
          className={styles.s1Title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Hola,<br />
          <em>cariño</em>
        </motion.h1>

        <motion.div
          className={styles.s1Rule}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.87, 0, 0.13, 1] }}
        />

        <motion.p
          className={styles.s1Sub}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Esto es tuyo
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// SECCIÓN 2 — Texto grande, Editorial
// ────────────────────────────────────────────────────────────────────────────
function Section2() {
  return (
    <section className={styles.s2}>
      <motion.div
        className={styles.s2Inner}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.s2Label}>✦ una app para nosotras ✦</p>
        <p className={styles.s2Text}>
          Aquí guardo todo lo que se me ocurre para que lo vivamos juntas.
          Cenas, planes, sorpresas.
        </p>
        <p className={styles.s2Text2}>
          Y más cosas que iré añadiendo.
        </p>
      </motion.div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// SECCIÓN 3 — Citas, feature principal fullscreen
// ────────────────────────────────────────────────────────────────────────────
function Section3({ onPress }) {
  return (
    <section className={styles.s3}>
      <motion.button
        className={styles.s3Card}
        onClick={onPress}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        whileTap={{ scale: 0.985 }}
      >
        {/* Número decorativo de fondo */}
        <span className={styles.s3BigNum} aria-hidden>01</span>

        <div className={styles.s3Body}>
          <div className={styles.s3TopRow}>
            <span className={styles.s3Badge}>● Activo · 1 nueva</span>
            <span className={styles.s3Arrow}>↗</span>
          </div>

          <h2 className={styles.s3Title}>Citas</h2>

          <div className={styles.s3Rule} />

          <p className={styles.s3Desc}>
            Tengo una propuesta esperándote para este domingo.
          </p>

          <p className={styles.s3Cta}>Ver las opciones →</p>
        </div>
      </motion.button>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// SECCIÓN 4 — Próximamente, más pequeña
// ────────────────────────────────────────────────────────────────────────────
function Section4() {
  const items = [
    { emoji: '✉️', label: 'Cartas', desc: 'Lo que quiero decirte' },
    { emoji: '📷', label: 'Recuerdos', desc: 'Nuestros momentos' },
  ]

  return (
    <section className={styles.s4}>
      <motion.div
        className={styles.s4Inner}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
      >
        <p className={styles.s4Label}>Próximamente</p>

        <div className={styles.s4Grid}>
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className={styles.s4Item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className={styles.s4Emoji}>{item.emoji}</span>
              <div>
                <p className={styles.s4Name}>{item.label}</p>
                <p className={styles.s4Desc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className={styles.s4Footer}>hecho con amor · solo para ti</p>
      </motion.div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Floral corner SVG decoration
// ────────────────────────────────────────────────────────────────────────────
function FloralCorner({ pos }) {
  const isRight = pos === 'br' || pos === 'tr'
  const isBottom = pos === 'br' || pos === 'bl'

  return (
    <svg
      className={`${styles.floralCorner} ${styles[`floral_${pos}`]}`}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{
        transform: `${isRight ? 'scaleX(-1)' : ''} ${isBottom ? 'scaleY(-1)' : ''}`.trim() || undefined
      }}
    >
      {/* Main flower */}
      <ellipse cx="55" cy="40" rx="7" ry="13" fill="#f5d5d3" opacity="0.6"/>
      <ellipse cx="68" cy="30" rx="7" ry="13" fill="#e8a4a0" opacity="0.5" transform="rotate(40 68 30)"/>
      <ellipse cx="75" cy="46" rx="7" ry="13" fill="#f5d5d3" opacity="0.6" transform="rotate(80 75 46)"/>
      <ellipse cx="65" cy="58" rx="7" ry="13" fill="#e8a4a0" opacity="0.5" transform="rotate(130 65 58)"/>
      <ellipse cx="50" cy="54" rx="7" ry="13" fill="#f5d5d3" opacity="0.6" transform="rotate(-130 50 54)"/>
      <circle cx="63" cy="46" r="9" fill="#e8a4a0" opacity="0.55"/>
      <circle cx="63" cy="46" r="5" fill="#c9a96e" opacity="0.5"/>

      {/* Stem + leaves */}
      <path d="M63 58 Q60 80 55 105" stroke="#c9a96e" strokeWidth="1.8" strokeLinecap="round" opacity="0.4"/>
      <ellipse cx="42" cy="82" rx="10" ry="17" fill="#c9a96e" opacity="0.22" transform="rotate(-40 42 82)"/>
      <ellipse cx="70" cy="92" rx="9" ry="15" fill="#e8a4a0" opacity="0.20" transform="rotate(30 70 92)"/>

      {/* Small secondary flower */}
      <ellipse cx="22" cy="35" rx="5" ry="9" fill="#f5d5d3" opacity="0.40"/>
      <ellipse cx="30" cy="27" rx="5" ry="9" fill="#e8a4a0" opacity="0.35" transform="rotate(45 30 27)"/>
      <ellipse cx="35" cy="40" rx="5" ry="9" fill="#f5d5d3" opacity="0.40" transform="rotate(90 35 40)"/>
      <circle cx="28" cy="36" r="6" fill="#e8a4a0" opacity="0.38"/>

      {/* Scattered petals */}
      <ellipse cx="90" cy="18" rx="4" ry="7" fill="#c9a96e" opacity="0.25" transform="rotate(20 90 18)"/>
      <ellipse cx="105" cy="30" rx="3" ry="6" fill="#f5d5d3" opacity="0.22" transform="rotate(-15 105 30)"/>
      <ellipse cx="15" cy="70" rx="3" ry="5" fill="#e8a4a0" opacity="0.20" transform="rotate(35 15 70)"/>
    </svg>
  )
}
