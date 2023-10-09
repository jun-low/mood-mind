import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-neutral-50 flex justify-center items-center text-neutral-900">
      <div className="w-full max-w-[600px] mx-auto">
        <Image
          src="/lotus.svg"
          alt="MoodMinder lotus logo"
          className="w-20 mb-4"
        />
        <h1 className="text-6xl mb-4">MoodMinder: Your Daily Mood Journal</h1>
        <p className="text-2xl text-neutral-900/60 mb-4">
          Discover a brighter and more balanced you with MoodMinder, your trusted companion for
          tracking your daily emotions and moods.
        </p>
        <div className="py-6">
          <Link href={href}>
            <button className="bg-blue-700 px-4 py-2 rounded-md text-lg text-white">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
