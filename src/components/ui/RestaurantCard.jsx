import { motion } from 'framer-motion'
import styles from './RestaurantCard.module.css'

const tagConfig = {
  amber:  { bg: '#fdf3e3', color: '#8a5c1a', dot: '#c9a96e' },
  green:  { bg: '#edf5ee', color: '#2a6a38', dot: '#5aab6a' },
  purple: { bg: '#f0edf8', color: '#5a2a8a', dot: '#9b7ad4' },
}

export default function RestaurantCard({ restaurant, isVoted, hasVote, onVote }) {
  const tag = tagConfig[restaurant.tagColor] || tagConfig.amber

  return (
    <div className={`${styles.card} ${isVoted ? styles.cardVoted : ''} ${hasVote && !isVoted ? styles.cardDimmed : ''}`}>

      {/* Left accent bar — color per restaurant */}
      <div className={styles.accentBar} style={{ background: restaurant.accentColor }} />

      <div className={styles.inner}>

        {/* Top: emoji + name + voted check */}
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <span className={styles.emoji}>{restaurant.emoji}</span>
            <div>
              <h2 className={styles.name}>{restaurant.name}</h2>
              <p className={styles.location}>{restaurant.subtitle}</p>
            </div>
          </div>

          {isVoted && (
            <motion.span
              className={styles.votedMark}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              ✓
            </motion.span>
          )}
        </div>

        {/* Type tag + price */}
        <div className={styles.metaRow}>
          <span className={styles.typeTag} style={{ background: tag.bg, color: tag.color }}>
            <span className={styles.typeDot} style={{ background: tag.dot }} />
            {restaurant.tag}
          </span>
          <span className={styles.price}>
            {restaurant.price}
            <span className={styles.priceLabel}>&nbsp;/ persona</span>
          </span>
        </div>

        {/* Description */}
        <p className={styles.description}>{restaurant.description}</p>

        {/* Details chips */}
        <div className={styles.details}>
          {restaurant.details.map((d, i) => (
            <span key={i} className={styles.detail}>{d.icon} {d.label}</span>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Actions */}
        <div className={styles.actions}>
          <a
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapsBtn}
            onClick={(e) => e.stopPropagation()}
          >
            Ver en Maps ↗
          </a>

          <motion.button
            className={`${styles.voteBtn} ${isVoted ? styles.voteBtnVoted : ''}`}
            style={isVoted ? { '--accent': restaurant.accentColor } : {}}
            onClick={onVote}
            disabled={hasVote}
            whileTap={!hasVote ? { scale: 0.96 } : {}}
          >
            {isVoted ? '✓ Elegida' : '♡ Quiero ir aquí'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
