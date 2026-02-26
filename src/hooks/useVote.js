import { useState, useEffect } from 'react'

export function useVote(dateId) {
  const key = `vote_${dateId}`

  const [vote, setVoteState] = useState(() => {
    try {
      return localStorage.getItem(key) || null
    } catch {
      return null
    }
  })

  const setVote = (restaurantId) => {
    try {
      localStorage.setItem(key, restaurantId)
    } catch {}
    setVoteState(restaurantId)
  }

  const clearVote = () => {
    try {
      localStorage.removeItem(key)
    } catch {}
    setVoteState(null)
  }

  return { vote, setVote, clearVote }
}
