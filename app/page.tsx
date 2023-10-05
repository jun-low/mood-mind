import { auth } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">MoodMinder: Your Daily Mood Journal 🧘</h1>
        <p className="text-2xl text-white/60 mb-4">
          Discover a brighter and more balanced you with MoodMinder, your trusted companion for
          tracking your daily emotions and moods.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-amber-600 px-4 py-2 rounded-lg text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
