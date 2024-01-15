'use client'

// Next imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// gpt-tokenizer
import { encode } from 'gpt-tokenizer'

// Style imports
import styles from './Cue.module.scss'

// Component imports
import { ImportCard } from '@/components/ImportCard/ImportCard'
import { TextCard } from '@/components/TextCard/TextCard'
import { ResultCard } from '@/components/ResultCard/ResultCard'

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

      const notesTokens = encode(notes)
      const responseTokens = []

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
        responseTokens.push(...encode(chunkValue))
        setResult((prev) => prev + chunkValue)
      }
      const tokenUsage = {
        notes: notesTokens.length,
        response: responseTokens.length
      }
      console.log(tokenUsage)

      const INPUT_COST = 0.03 / 1000
      const OUTPUT_COST = 0.06 / 1000
      const BASE_PROMPT_TOKEN_LENGTH = 602

      const baseCost = (BASE_PROMPT_TOKEN_LENGTH * INPUT_COST) + (tokenUsage.notes * INPUT_COST) + (tokenUsage.response * OUTPUT_COST)
      const costByTwo = baseCost * 2
      const costByTwoPlusTwentyPercent = costByTwo + (costByTwo * 0.2)

      console.log(`Cost incurred by Cue would be: $${baseCost}`)
      console.log(`Cost to the student for this generation would be: $${costByTwoPlusTwentyPercent}`)
      let studentMonthlyUsage = costByTwoPlusTwentyPercent * 20 * 4
      studentMonthlyUsage = Number(Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(studentMonthlyUsage))
      let cueMonthlyUsage = baseCost * 20 * 4
      cueMonthlyUsage = Number(Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cueMonthlyUsage))
      console.log(`If the student were to generate these cues up to their limit of 20 per week during the school year, their monthly usage would be approximately: ${studentMonthlyUsage}`)
      console.log(`And it would cost Cue approximately: ${cueMonthlyUsage}`)

      setLoading(false)
    }

    if (submitted)
      generate()
  }, [submitted, notes])

  const { data: status } = useSession()
  if (!status)
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
