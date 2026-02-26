import { motion } from 'framer-motion'
import styles from './VoteResult.module.css'

export default function VoteResult({ restaurant, onClear }) {
  return (
    <motion.div
      className={styles.result}
      style={{ '--accent': restaurant.accentColor }}
      initial={{ opacity: 0, y: -16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.glow} />

      <div className={styles.inner}>
        <span className={styles.emoji}>{restaurant.emoji}</span>
        <div className={styles.text}>
          <p className={styles.label}>Has elegido</p>
          <p className={styles.name}>{restaurant.name}</p>
          <p className={styles.subtitle}>{restaurant.subtitle}</p>
        </div>
        <span className={styles.check}>✓</span>
      </div>
    </motion.div>
  )
}
