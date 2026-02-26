import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = document.getElementById('cursor')
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const addHover = () => cursor.classList.add('hover')
    const removeHover = () => cursor.classList.remove('hover')

    window.addEventListener('mousemove', move)

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])

  return cursorRef
}
