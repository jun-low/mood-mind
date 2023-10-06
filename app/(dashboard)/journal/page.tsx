import { prisma } from '@/utils/db'
import Link from 'next/link'

const JournalPage = async () => {
  return (
    <div className="px-6 py-8 bg-zinc-100/50 h-full">
      <h1 className="text-4xl mb-12">Journals</h1>
    </div>
  )
}

export default JournalPage
