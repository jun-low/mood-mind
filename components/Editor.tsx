'use client'
import { useState } from 'react'

const Editor = ({ entry }) => {
  const [text, setText] = useState(entry.content)

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
      </div>
      <div className="col-span-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-full text-xl p-8"
        />
      </div>
    </div>
  )
}

export default Editor
