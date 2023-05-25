// Next imports
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'

// Style imports
import styles from './Cue.module.scss'

// Component imports
import ImportCard from '@/components/ImportCard/ImportCard'
import TextCard from '@/components/TextCard/TextCard'
import ResultCard from '@/components/ResultCard/ResultCard'

export default function Cue () {
  const [importMethod, setImportMethod] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')
  const [result, setResult] = useState('')

  const { data: status } = useSession()
  if (status === 'loading')
    return <p>Loading...</p>

  useEffect(() => {
    if (submitted)
      generate()
  }, [submitted])

  function handleImportMethod (method) {
    setImportMethod(method)
  }

  function handleNotes (notes) {
    setNotes(notes)
  }

  const generate = async () => {
    setResult('')
    setLoading(true)
    console.log('[page] [generate()] calling generate API with notes: ', notes)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes }),
    })

    if (!response.ok)
      throw new Error(response.statusText)

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

export async function getServerSideProps (context) {
  const session = await getServerSession(context.req, context.res)

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  return {
    props: {
      session
    }
  }
}
