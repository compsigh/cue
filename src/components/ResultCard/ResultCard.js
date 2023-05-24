import ReactMarkdown from 'react-markdown'
import styles from './ResultCard.module.scss'

const ResultsCard = ({ result }) => {
  result = JSON.parse(result)
  return (
    <div className={styles.resultsCard}>
      <h2>Here are some relevant cues:</h2>
      <div className={styles.results}>
        {result.cues.map((cue, index) => (
          <div key={index} className={styles.cue}>
            <ReactMarkdown>{cue.question}</ReactMarkdown>
            <details>
              <summary>A potential answer</summary>
              <ReactMarkdown>{cue.answer}</ReactMarkdown>
            </details>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsCard
