import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      {/* ── Header editorial ── */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.headerEyebrow}>para ti · siempre</p>
        <div className={styles.headerRule} />
      </motion.header>

      {/* ── Hero text block ── */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <p className={styles.heroLabel}>Bienvenida</p>
        <h1 className={styles.heroTitle}>
          Hola,<br />
          <em>cariño</em>
        </h1>
        <p className={styles.heroSub}>
          Esto es tuyo. Aquí guardo todo lo que pienso para nosotras.
        </p>
      </motion.section>

      {/* ── Main feature: Citas ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <FeatureCitas onPress={() => navigate('/citas')} />
      </motion.div>

      {/* ── Coming soon grid ── */}
      <motion.div
        className={styles.comingSoon}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className={styles.comingSoonLabel}>Próximamente</p>
        <div className={styles.comingSoonGrid}>
          {[
            { emoji: '✉️', label: 'Cartas' },
            { emoji: '📷', label: 'Recuerdos' },
          ].map((item) => (
            <div key={item.label} className={styles.comingSoonItem}>
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Footer ── */}
      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className={styles.footerRule} />
        <p>hecho con amor · solo para ti</p>
      </motion.footer>

    </div>
  )
}

// ── Citas — feature card editorial ──────────────────────────────────────────
function FeatureCitas({ onPress }) {
  return (
    <motion.button
      className={styles.citasFeature}
      onClick={onPress}
      whileTap={{ scale: 0.985 }}
    >
      {/* Big decorative number */}
      <span className={styles.citasNumber}>01</span>

      <div className={styles.citasContent}>
        <div className={styles.citasTop}>
          <span className={styles.citasTag}>Activo · 1 nueva</span>
          <span className={styles.citasArrow}>↗</span>
        </div>

        <h2 className={styles.citasTitle}>Citas</h2>
        <p className={styles.citasSub}>Planes para nosotras</p>

        <div className={styles.citasDivider} />

        <p className={styles.citasDesc}>
          Tengo una propuesta esperándote para este domingo.
        </p>
      </div>
    </motion.button>
  )
}
