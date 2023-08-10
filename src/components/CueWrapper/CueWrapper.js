'use client'

// Next imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// Style imports
import styles from './Cue.module.scss'

// Component imports
import ImportCard from '@/components/ImportCard/ImportCard'
import TextCard from '@/components/TextCard/TextCard'
import ResultCard from '@/components/ResultCard/ResultCard'

export default function CueWrapper () {
  const [importMethod, setImportMethod] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    const generate = async () => {
      setResult('')
      setLoading(true)
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes })
      })

      if (!response.ok) {
        console.log(response)
        const message = `0

Something went wrong!

${response.statusText}

`
        setResult(message)
        setLoading(false)
        return
      }

      // This data is a ReadableStream
      const data = response.body
      if (!data)
        return

      const reader = data.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        setResult((prev) => prev + chunkValue)
      }
      setLoading(false)
    }

    if (submitted)
      generate()
  }, [submitted, notes])

  const { data: status } = useSession()
  if (status === 'loading')
    return <p>Loading...</p>

  function handleImportMethod (method) {
    setImportMethod(method)
  }

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
      <ImportCard onUpdateImportMethod={handleImportMethod} />
    </div>
  )
}
