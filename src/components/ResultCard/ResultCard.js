import Typewriter from 'typewriter-effect'
import { Grid } from 'react-loader-spinner'
import styles from './ResultCard.module.scss'

const parseResponse = (result) => {
  const lines = result.split('\n').filter(line => line.trim() !== '')
  const cues = []

  // Starting from line 1 because line 0 has the $NOTES_IDENTIFIED value
  // TODO: use notes_identified
  for (let i = 1; i < lines.length; i += 2) {
    const cue = { question: lines[i], answer: lines[i + 1] }
    cues.push(cue)
  }

  return cues
}

const ResultsCard = ({ result, loading }) => {
  const cues = parseResponse(result)

  return (
    <div className={styles.resultsCard}>
      <h2>Here are some relevant cues:</h2>
      <div className={styles.results}>
        {cues.map((cue, index) => (
          <div key={index} className={styles.cue}>
            {
              cue.answer && (
                <>
                  <Typewriter
                    options={{
                      strings: cue.question,
                      autoStart: true,
                      delay: 20,
                      cursor: ''
                    }}
                  />
                  <details>
                    <summary>A potential answer</summary>
                    <Typewriter
                      options={{
                        strings: cue.answer,
                        autoStart: true,
                        delay: 20,
                        cursor: ''
                      }}
                    />
                  </details>
                </>
              )
            }
          </div>
        ))}
        {
          loading && (
            <Grid
              height="20"
              width="20"
              color="#000000"
              wrapperStyle={{
                justifyContent: 'center',
                paddingTop: 10
              }}
            />
          )
        }
      </div>
    </div>
  )
}

export default ResultsCard
