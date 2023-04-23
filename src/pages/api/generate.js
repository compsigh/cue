import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not found; please notify the developers."
      }
    })
    return
  }

  const notes = req.body.notes || ''
  if (notes.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter some notes!"
      }
    })
    return
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(notes),
      temperature: 0.3,
      max_tokens: 100
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  }
  catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    }
    else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.'
        }
      })
    }
  }
}

function generatePrompt (notes) {
  return `From the notes below, suggest relevant study questions to use as active recall prompts.
  Below are two examples, followed by the requested notes to generate prompts for.

First set of notes:
- To access knowledge is to access power; distribution of knowledge goes hand-in-hand with distribution of power
- Rome became a center of intellectual development
- New knowledge can subvert the old knowledge
  - If new knowledge is power as well, it likewise has the ability to subvert old power
- Very learned priests were interested in figuring out the way to relate to God
- Lawyers: humans relate to each other
- Ruling class: steeped in mos maiorum
- Romans were willing to adapt other people's knowledge if it brought them advantage
- Knowledge was mainly transferred through apprenticeship or by ancestry
  - Elites wanted to keep the knowledge in their hands

First set of active recall prompts:
- What was the relationship between knowledge and power in Rome?
- Why was the Roman elite hellbent on keeping new knowledge out of Rome, particularly out of the minds of commoners?
- Given how the Roman elite wanted to keep knowledge all to themselves, how was it gatekept?

Second set of notes:
- Before the appearance of Greek philosophers, there was no Roman philosophy
- Greeks brought an alternate discourse of morality i.e. Plato, Aristotle, et al.
- The idea of proper moral behavior wasn't in the hands of the elite anymore
- Cicero: oratory is the key to public life
- Teachers of oratory began to emerge, which posed a great threat to Roman elites
- 161: consuls expelled philosophers and orators from Rome
- 92: they worked their way back, expelled again

Second set of active recall prompts:
- What did the arrival of Greek philosophy mean for Rome?
- How were professional orators a threat for the Roman elite?

Requested notes to generate prompts for:
${notes}

Suggested active recall prompts:
`
}
