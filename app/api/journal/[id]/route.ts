import { update } from '@/utils/actions';
import { analyzeEntry } from '@/utils/ai';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { NextResponse } from 'next/server'

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getUserFromClerkID()

  await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id: id,
        userId: user.id,
      },
    },
  })

  await update(['/journal'])

  return NextResponse.json({ data: { id: id } })
}

export const PATCH = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const { updates } = await request.json()
  const user = await getUserFromClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: id,
        userId: user.id,
      },
    },
    data: updates,
  })

  const analysis = await analyzeEntry(entry)

  // Use upsert to update existing record if satisfies the where condition or inserts a new record
  const savedAnalysis = await prisma.entryAnalysis.upsert({
    where: {
      entryId: entry.id,
    },
    update: { ...analysis },
    create: {
      entryId: entry.id,
      userId: user.id,
      ...analysis,
    },
  })

  await update(['/journal'])

  return NextResponse.json({ data: { ...entry, analysis: savedAnalysis } })
}
