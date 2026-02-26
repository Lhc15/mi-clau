import { useEffect, useRef } from 'react'
import styles from './Particles.module.css'

const PETAL_COUNT = 22

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

export default function Particles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const petals = []

    for (let i = 0; i < PETAL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = styles.petal

      // Random size
      const size = randomBetween(3, 9)
      el.style.width = size + 'px'
      el.style.height = size * randomBetween(1.2, 2.2) + 'px'

      // Random starting position
      el.style.left = randomBetween(-5, 105) + 'vw'
      el.style.top = randomBetween(-20, -5) + 'vh'

      // Random color (gold, rose, cream variants)
      const colors = [
        'rgba(201, 169, 110, 0.55)',
        'rgba(196, 120, 106, 0.45)',
        'rgba(245, 240, 232, 0.25)',
        'rgba(201, 169, 110, 0.30)',
        'rgba(122, 96, 53, 0.50)',
      ]
      el.style.background = colors[Math.floor(Math.random() * colors.length)]
      el.style.borderRadius = randomBetween(40, 60) + '% ' + randomBetween(40, 60) + '%'

      // Animation timing
      const duration = randomBetween(8, 18)
      const delay = randomBetween(0, 12)
      el.style.animationDuration = duration + 's'
      el.style.animationDelay = delay + 's'
      el.style.setProperty('--drift', randomBetween(-120, 120) + 'px')
      el.style.setProperty('--spin', randomBetween(-540, 540) + 'deg')

      container.appendChild(el)
      petals.push(el)
    }

    return () => {
      petals.forEach((p) => p.remove())
    }
  }, [])

  return <div ref={containerRef} className={styles.container} aria-hidden="true" />
}
