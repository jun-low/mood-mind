import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { FC } from 'react'

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

interface JournalEditorPageProps {
  params: {
    id: string;
  };
}

const JournalEditorPage: FC<JournalEditorPageProps> = async ({ params }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage
