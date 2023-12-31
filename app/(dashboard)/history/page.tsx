import HistoryChart from '@/components/HistoryChart'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserFromClerkID()
  const analyses = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  const totalScore = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const averageScore = totalScore / analyses.length
  return { analyses, averageScore }
}

const HistoryPage = async () => {
  const { analyses, averageScore } = await getData()
  return (
    <div className="h-full px-6 py-8">
      <h1 className="text-4xl mb-12">History</h1>
      <div>
        <h1 className="text-2xl mb-4">{ `Avg. Sentiment: ${ averageScore }` }</h1>
      </div>
      <div className="h-full w-full">
        <HistoryChart data={ analyses }/>
      </div>
    </div>
  )
}

export default HistoryPage
