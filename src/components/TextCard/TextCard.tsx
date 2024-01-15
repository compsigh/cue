'use client'

import { useState } from 'react'
import styles from './TextCard.module.scss'

export function TextCard ({ onUpdateNotes, onUpdateSubmitted }) {
  const [notes, setNotes] = useState('')

  async function onSubmit (event) {
    event.preventDefault()
    onUpdateNotes(notes)
    onUpdateSubmitted(true)
  }

  return (
    <div className={styles.textCard}>
      <main className={styles.main}>
        <h2>Paste your notes here:</h2>
        <form onSubmit={onSubmit}>
          <input
            type="textarea"
            name="notes"
            placeholder="The Roman Republic..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </main>
    </div>
  )
}
