import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { dates } from '../data/dates'
import { useVote } from '../hooks/useVote'
import styles from './DateDetail.module.css'

export default function DateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const date = dates.find((d) => d.id === id)
  const { vote, setVote, clearVote } = useVote(id)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [dismissed, setDismissed] = useState([]) // idx of voted/skipped cards
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
    // Advance to next card
    if (currentIdx < date.restaurants.length - 1) {
      setTimeout(() => setCurrentIdx(i => i + 1), 400)
    }
  }

  const handleNext = () => {
    if (currentIdx < date.restaurants.length - 1) setCurrentIdx(i => i + 1)
  }
  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(i => i - 1)
  }

  const votedRestaurant = date.restaurants.find((r) => r.id === vote)

  return (
    <div className={styles.page}>
      {burst && <Confetti />}

      <div className={styles.inner}>
        {/* Header */}
        <header className={styles.header}>
          <button className={styles.back} onClick={() => navigate('/citas')}>← citas</button>
          <div className={styles.headerRule} />
          <p className={styles.headerDate}>{date.date}</p>
          <h1 className={styles.title}>{date.title}</h1>
          <p className={styles.desc}>{date.description}</p>
        </header>

        {/* Voted banner */}
        <AnimatePresence>
          {votedRestaurant && (
            <motion.div
              className={styles.chosenBanner}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className={styles.chosenInner}>
                <span className={styles.chosenEmoji}>{votedRestaurant.emoji}</span>
                <div>
                  <p className={styles.chosenLabel}>Tu elección</p>
                  <p className={styles.chosenName}>{votedRestaurant.name}</p>
                </div>
                <button className={styles.chosenChange} onClick={() => { clearVote(); setCurrentIdx(0) }}>cambiar</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Deck label */}
        <div className={styles.deckMeta}>
          <span className={styles.deckLabel}>elige una opción</span>
          <span className={styles.deckCounter}>{currentIdx + 1} / {date.restaurants.length}</span>
        </div>

        {/* CARD DECK */}
        <div className={styles.deck}>
          {/* Background stacked cards (peek) */}
          {date.restaurants.map((r, i) => {
            if (i <= currentIdx) return null
            const stackOffset = Math.min(i - currentIdx, 3)
            return (
              <div
                key={r.id}
                className={styles.cardPeek}
                style={{
                  bottom: `${-(stackOffset * 14)}px`,
                  transform: `rotate(${stackOffset % 2 === 0 ? stackOffset * 1.5 : -(stackOffset * 1.5)}deg) scale(${1 - stackOffset * 0.03})`,
                  zIndex: 10 - stackOffset,
                  background: `hsl(${220 + stackOffset * 15}, 80%, ${40 - stackOffset * 5}%)`,
                }}
              />
            )
          })}

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.85, y: 40, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: vote ? 120 : -120, rotate: vote ? 8 : -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {(() => {
                const r = date.restaurants[currentIdx]
                return (
                  <>
                    {/* Card top accent */}
                    <div className={styles.cardAccent} style={{ background: r.accentColor || '#4455ee' }} />

                    <div className={styles.cardBody}>
                      {/* Emoji + name */}
                      <div className={styles.cardTop}>
                        <span className={styles.cardEmoji}>{r.emoji}</span>
                        <div>
                          <h2 className={styles.cardName}>{r.name}</h2>
                          <p className={styles.cardSub}>{r.subtitle}</p>
                        </div>
                        <span className={styles.cardPrice}>{r.price}</span>
                      </div>

                      {/* Tag */}
                      <span className={styles.cardTag}>{r.tag}</span>

                      {/* Description */}
                      <p className={styles.cardDesc}>{r.description}</p>

                      {/* Details */}
                      <div className={styles.cardDetails}>
                        {r.details.map((d, i) => (
                          <span key={i} className={styles.cardDetail}>{d.icon} {d.label}</span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className={styles.cardActions}>
                        <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.mapsBtn}>
                          Maps ↗
                        </a>

                        {!vote ? (
                          <motion.button
                            className={styles.voteBtn}
                            onClick={() => handleVote(r.id)}
                            whileTap={{ scale: 0.95 }}
                          >
                            ♥ Quiero ir aquí
                          </motion.button>
                        ) : vote === r.id ? (
                          <span className={styles.votedLabel}>✓ Elegida</span>
                        ) : null}
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav between cards */}
        <div className={styles.deckNav}>
          <button className={styles.navBtn} onClick={handlePrev} disabled={currentIdx === 0}>← anterior</button>
          <button className={styles.navBtn} onClick={handleNext} disabled={currentIdx === date.restaurants.length - 1}>siguiente →</button>
        </div>

      </div>
    </div>
  )
}

// ── Confetti ─────────────────────────────────────────────────────────────────
const CONF_COLORS = ['#4455ee', '#ff10c8', '#ff5500', '#7755dd', '#00ccff', '#d4f060']

function Confetti() {
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    dur: Math.random() * 2 + 2,
    size: Math.random() * 10 + 5,
    drift: (Math.random() - 0.5) * 180,
    spin: (Math.random() - 0.5) * 720,
    color: CONF_COLORS[i % CONF_COLORS.length],
    round: i % 3 === 0,
  }))
  return (
    <div className={styles.confetti}>
      {pieces.map((p) => (
        <motion.div key={p.id} style={{
          position: 'absolute', top: 0, left: `${p.x}%`,
          width: p.size, height: p.round ? p.size : p.size * 1.6,
          background: p.color, borderRadius: p.round ? '50%' : '3px',
        }}
          animate={{ y: '110vh', x: p.drift, rotate: p.spin, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
