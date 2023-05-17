import { Configuration, OpenAIApi } from 'openai'
import getUserSessionAndData from '@/functions/get-user-session-and-data.js'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

export default async function handler (req, res) {
  const user = await getUserSessionAndData(req, res)

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API key not found; please notify the developers.'
      }
    })
    return
  }

  const notes = req.body.notes || ''
  if (notes.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter some notes!'
      }
    })
    return
  }

  try {
    // TODO: stream completion
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: generatePrompt(notes)
        }
      ],
      temperature: 0.3,
    })
    res.status(200).json({ result: completion.data.choices[0].message.content })
  }
  catch (error) {
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
  return `From the given notes, suggest study questions to use as active recall prompts.
Keep these in mind to curate your response:
- Only suggest questions in the context of the given notes, and not what you already know about the topic.
- Pick only the most relevant and high-level pieces of information to convert into questions.
- For each suggested question, generate a potential answer. These answers, like your suggested questions, should only be derived from the given notes, and not any prior knowledge of the subject.
- Format your response as a JSON object, containing the following:
  - A \`notes_identified\` key indicating the amount of separate notes processed. These may be formatted in the given notes as Markdown bullet points (-), newlines, or some other form of delineation. It is up to you to determine what that is.
  - A \`cues\` key, whose value is an array of objects, each object containing two properties: \`question\`, for your suggested question, and \`answer\` for your generated potential answer to your suggested question.

Below are two examples of notes and relevant prompts for those notes.

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

Now, below are the given notes to generate prompts for.

${notes}

Suggested active recall prompts:
`
}
