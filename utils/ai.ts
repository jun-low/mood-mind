import { loadQARefineChain } from '@langchain/classic/chains';
import { OutputFixingParser } from '@langchain/classic/output_parsers';
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { z } from 'zod';

const MODEL = 'gpt-4o-mini'

// Structure ai output everytime, so response always has same format/facts
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z
      .string()
      .describe(
        'a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  // Guidance for the prompt
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match ' +
      'the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input: string = await prompt.format({
    entry: content,
  })

  return input
}

export const analyzeEntry = async (entry: any) => {
  const input = await getPrompt(entry.content)
  const model = new ChatOpenAI({ temperature: 0, model: MODEL })
  const output = (await model.invoke(input)).text

  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new ChatOpenAI({ temperature: 0, model: MODEL }),
      parser
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}

export const qa = async (question: string, entries: any) => {
  // Get input entries and extracting relevant content and metadata.
  const docs = entries.map(
    (entry: any) =>
      new Document({
        pageContent: entry.content,
        metadata: {source: entry.id, date: entry.createdAt},
      })
  )
  const model = new ChatOpenAI({ temperature: 0, model: MODEL })

  // Chain for the model
  const chain = loadQARefineChain(model as any)

  // Initialize embeddings for language understanding.
  const embeddings = new OpenAIEmbeddings()

  // Create a vector store from the documents with embeddings.
  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await vectorStore.similaritySearch(question)

  // Utilize the QA refinement chain to generate an answer
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
