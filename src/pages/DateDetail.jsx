import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { dates } from '../data/dates'
import { useVote } from '../hooks/useVote'
import RestaurantCard from '../components/ui/RestaurantCard'
import styles from './DateDetail.module.css'

export default function DateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const date = dates.find((d) => d.id === id)
  const { vote, setVote, clearVote } = useVote(id)
  const [burst, setBurst] = useState(false)

  if (!date) return (
    <div className={styles.notFound}>
      <button onClick={() => navigate('/citas')}>← volver</button>
    </div>
  )

  const handleVote = (restaurantId) => {
    setVote(restaurantId)
    setBurst(true)
    setTimeout(() => setBurst(false), 3000)
  }

  const votedRestaurant = date.restaurants.find((r) => r.id === vote)

  return (
    <div className={styles.page}>

      {/* Confetti */}
      <AnimatePresence>{burst && <Confetti />}</AnimatePresence>

      <motion.div
        className={styles.inner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className={styles.header}>
          <button className={styles.back} onClick={() => navigate('/citas')}>← citas</button>
          <div className={styles.headerRule} />
          <p className={styles.headerDate}>{date.date}</p>
          <h1 className={styles.title}>{date.title}</h1>
          <p className={styles.desc}>{date.description}</p>
        </header>

        {/* Voted result banner */}
        <AnimatePresence>
          {votedRestaurant && (
            <motion.div
              className={styles.chosenBanner}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.chosenInner}>
                <span className={styles.chosenEmoji}>{votedRestaurant.emoji}</span>
                <div>
                  <p className={styles.chosenLabel}>Tu elección</p>
                  <p className={styles.chosenName}>{votedRestaurant.name}</p>
                </div>
                <button className={styles.chosenChange} onClick={clearVote}>cambiar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section label */}
        <div className={styles.sectionLabel}>
          <span>elige una opción</span>
          <div className={styles.sectionLine} />
        </div>

        {/* Restaurants */}
        <div className={styles.restaurants}>
          {date.restaurants.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <RestaurantCard
                restaurant={r}
                isVoted={vote === r.id}
                hasVote={!!vote}
                onVote={() => !vote && handleVote(r.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// ── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    dur: Math.random() * 2 + 2,
    size: Math.random() * 7 + 4,
    drift: (Math.random() - 0.5) * 180,
    spin: (Math.random() - 0.5) * 600,
    color: ['#e8a4a0', '#c4706a', '#c9a96e', '#edddb8', '#1a1714', '#d4606a'][i % 6],
    isRect: i % 3 !== 0,
  }))

  return (
    <motion.div
      className={styles.confetti}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute', top: 0, left: `${p.x}vw`,
            width: p.size, height: p.isRect ? p.size * 1.8 : p.size,
            background: p.color,
            borderRadius: p.isRect ? '2px' : '50%',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '110vh', x: p.drift, rotate: p.spin, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </motion.div>
  )
}
