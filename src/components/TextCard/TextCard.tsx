import { generate } from '@/functions/generate'
import styles from './TextCard.module.scss'

export async function TextCard () {
  async function callGenerate (formData: FormData) {
    'use server'
    const notes = formData.get('notes').toString()
    const result = await generate(notes)
    return result
    // TODO: figure out how to get the result to the user & render ResultCard
  }

  return (
    <div className={styles.textCard}>
      <main className={styles.main}>
        <h2>Paste your notes here:</h2>
        <form action={callGenerate}>
          <textarea
            name="notes"
            placeholder="The Roman Republic..."
            rows={10}
            cols={55}
          ></textarea>
          <button type="submit"></button>
        </form>
      </main>
    </div>
  )
}
