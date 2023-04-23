import ReactMarkdown from 'react-markdown'
import styles from './ResultCard.module.scss'

const ResultsCard = ({ result }) => {
  return (
    <div className={styles.resultsCard}>
      <h2>Here are some relevant cues:</h2>
      <div className={styles.results}>
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
    </div>
  )
}

export default ResultsCard
