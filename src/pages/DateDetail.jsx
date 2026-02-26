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
  const [burst, setBurst] = useState(false)
  // showVoted: cuando hay voto, mostrar la card elegida en lugar de la baraja
  const [showVoted, setShowVoted] = useState(false)

  if (!date) return (
    <div className={styles.notFound}>
      <button onClick={() => navigate('/citas')}>← volver</button>
    </div>
  )

  const handleVote = (restaurantId) => {
    setVote(restaurantId)
    setShowVoted(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 3000)
  }

  const handleChange = () => {
    clearVote()
    setShowVoted(false)
    setCurrentIdx(0)
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

        {/* ── CARD ELEGIDA (visible tras votar) ── */}
        <AnimatePresence mode="wait">
          {showVoted && votedRestaurant ? (
            <motion.div
              key="voted"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className={styles.votedBanner}>
                <span className={styles.votedBannerEmoji}>♥</span>
                <span className={styles.votedBannerLabel}>Tu elección</span>
                <button className={styles.chosenChange} onClick={handleChange}>cambiar</button>
              </div>
              <RestaurantCard r={votedRestaurant} vote={vote} onVote={handleVote} isVoted />
            </motion.div>
          ) : (

            /* ── BARAJA ── */
            <motion.div key="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className={styles.deckMeta}>
                <span className={styles.deckLabel}>elige una opción</span>
                <span className={styles.deckCounter}>{currentIdx + 1} / {date.restaurants.length}</span>
              </div>

              <div className={styles.deck}>
                {/* Cartas de atrás — asoman en la parte inferior */}
                {date.restaurants.map((r, i) => {
                  if (i <= currentIdx) return null
                  const depth = Math.min(i - currentIdx, 3) // max 3 cartas visibles detrás
                  const rot = depth % 2 === 0 ? depth * 2.5 : -(depth * 2.5)
                  const blues = ['#3344cc', '#2233aa', '#1a2288']
                  return (
                    <div
                      key={r.id}
                      className={styles.cardBehind}
                      style={{
                        transform: `rotate(${rot}deg) translateY(${depth * 8}px) scale(${1 - depth * 0.04})`,
                        background: blues[depth - 1] || blues[2],
                        zIndex: 20 - depth,
                      }}
                    />
                  )
                })}

                {/* Carta activa */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIdx}
                    className={styles.cardActive}
                    initial={{ opacity: 0, y: 50, scale: 0.88, rotate: -4 }}
                    animate={{ opacity: 1, y: 0,  scale: 1,    rotate: 0  }}
                    exit={{   opacity: 0, x: 140,  scale: 1.04, rotate: 8  }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  >
                    <RestaurantCard
                      r={date.restaurants[currentIdx]}
                      vote={vote}
                      onVote={handleVote}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Nav */}
              <div className={styles.deckNav}>
                <button className={styles.navBtn} onClick={handlePrev} disabled={currentIdx === 0}>← anterior</button>
                <button className={styles.navBtn} onClick={handleNext} disabled={currentIdx === date.restaurants.length - 1}>siguiente →</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Componente carta de restaurante ─────────────────────────────────────────── */
function RestaurantCard({ r, vote, onVote, isVoted }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardAccentBar} style={{ background: r.accentColor || '#4455ee' }} />
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.cardEmoji}>{r.emoji}</span>
          <div className={styles.cardTitleWrap}>
            <h2 className={styles.cardName}>{r.name}</h2>
            <p className={styles.cardSub}>{r.subtitle}</p>
          </div>
          <span className={styles.cardPrice}>{r.price}</span>
        </div>

        <span className={styles.cardTag}>{r.tag}</span>
        <p className={styles.cardDesc}>{r.description}</p>

        <div className={styles.cardDetails}>
          {r.details.map((d, i) => (
            <span key={i} className={styles.cardDetail}>{d.icon} {d.label}</span>
          ))}
        </div>

        <div className={styles.cardActions}>
          <a href={r.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.mapsBtn}>Maps ↗</a>
          {isVoted ? (
            <span className={styles.votedLabel}>✓ Elegida</span>
          ) : !vote ? (
            <motion.button
              className={styles.voteBtn}
              onClick={() => onVote(r.id)}
              whileTap={{ scale: 0.95 }}
            >
              ♥ Quiero ir aquí
            </motion.button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* ── Confetti ──────────────────────────────────────────────────────────────── */
const CONF_COLORS = ['#4455ee','#ff10c8','#ff5500','#7755dd','#00ccff','#d4f060']
function Confetti() {
  const pieces = Array.from({ length: 55 }, (_, i) => ({
    id: i, x: Math.random() * 100, delay: Math.random() * 0.6,
    dur: Math.random() * 2 + 2, size: Math.random() * 10 + 5,
    drift: (Math.random() - 0.5) * 200, spin: (Math.random() - 0.5) * 720,
    color: CONF_COLORS[i % CONF_COLORS.length], round: i % 3 === 0,
  }))
  return (
    <div className={styles.confetti}>
      {pieces.map((p) => (
        <motion.div key={p.id}
          style={{ position:'absolute', top:0, left:`${p.x}%`, width:p.size, height:p.round?p.size:p.size*1.5, background:p.color, borderRadius:p.round?'50%':'3px' }}
          animate={{ y:'110vh', x:p.drift, rotate:p.spin, opacity:[0,1,1,0] }}
          transition={{ duration:p.dur, delay:p.delay, ease:'easeIn' }}
        />
      ))}
    </div>
  )
}
