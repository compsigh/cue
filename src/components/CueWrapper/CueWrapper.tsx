// TODO: unwrap CueWrapper into ImportCard

'use client'

// Next imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// Style imports
import styles from './Cue.module.scss'

// Component imports
import { ImportCard } from '@/components/ImportCard/ImportCard'
import { TextCard } from '@/components/TextCard/TextCard'
import { ResultCard } from '@/components/ResultCard/ResultCard'

export default function CueWrapper () {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {

    if (submitted)
      generate()
  }, [submitted, notes])

  const { data: status } = useSession()
  if (!status)
    return <p>Loading...</p>

  function handleNotes (notes) {
    setNotes(notes)
  }

  function handleSubmitted (submitted) {
    setSubmitted(submitted)
  }

  if (importMethod === 'text' && !submitted)
    return (
      <div className={styles.textCard}>
        <TextCard onUpdateNotes={handleNotes} onUpdateSubmitted={handleSubmitted} />
      </div>
    )

  if (submitted)
    return (
      <div className={styles.resultCard}>
        <ResultCard result={result} loading={loading} />
      </div>
    )

  return (
    <div className={styles.importCard}>
      <ImportCard />
    </div>
  )
}
