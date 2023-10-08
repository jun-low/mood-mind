'use client'
import { deleteEntry, updateEntry } from '@/utils/api';
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content)
  const [currentEntry, setEntry] = useState(entry)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (_value === entry.content) return
      setIsSaving(true)

      const { data } = await updateEntry(entry.id, { content: _value })

      setEntry(data)
      setIsSaving(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-emerald-300"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-full text-xl p-8 outline-none"
        />
      </div>
    </div>
  )
}

export default Editor
