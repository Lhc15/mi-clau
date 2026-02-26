import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { dates } from '../data/dates'
import styles from './Dates.module.css'

export default function Dates() {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>

      <motion.div
        className={styles.inner}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className={styles.header}>
          <button className={styles.back} onClick={() => navigate('/')}>
            ← inicio
          </button>
          <div className={styles.headerRule} />
          <div className={styles.headerBottom}>
            <h1 className={styles.title}>Citas</h1>
            <p className={styles.count}>{dates.length} plan{dates.length !== 1 ? 'es' : ''}</p>
          </div>
        </header>

        {/* List */}
        <motion.div
          className={styles.list}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          {dates.map((date, i) => (
            <motion.div
              key={date.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <DateRow date={date} index={i} onClick={() => navigate(`/citas/${date.id}`)} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    </div>
  )
}

function DateRow({ date, index, onClick }) {
  return (
    <motion.button
      className={styles.row}
      onClick={onClick}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.2 }}
    >
      <span className={styles.rowNum}>0{index + 1}</span>

      <div className={styles.rowContent}>
        <div className={styles.rowTop}>
          <span className={styles.rowDate}>{date.date}</span>
          {date.status === 'open' && <span className={styles.rowBadge}>abierta</span>}
        </div>
        <h2 className={styles.rowTitle}>{date.title}</h2>
        <p className={styles.rowDesc}>{date.description}</p>
      </div>

      <span className={styles.rowArrow}>→</span>
    </motion.button>
  )
}
