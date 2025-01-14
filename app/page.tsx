import React from 'react'
import { jlptLevels } from "@/constants";
import Link from 'next/link';
const page = () => {
  return (
    <div className='px-4 md:mx-auto md:px-0 container mt-3'>
      <h1 className='text-4xl mb-5'>Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {jlptLevels.map((level, index) => (
          <div key={index} className="p-4 border border-gray-600 gap-3 rounded flex justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">N{level.level}</div>
            <div className="flex flex-col gap-0 justify-items-center">
              <p className="text-base leading-tight">{level.title}</p>
              <span className="text-xs text-zinc-400 leading-tight">
                {level.count} Kanji characters
              </span>
            </div>
          </div>
          <Link
            href={`/quiz?level=${level.level}`}
            className="flex items-center bg-gray-800 px-3 rounded hover:bg-gray-700"
          >
            Start
          </Link>
        </div>
        ))}
      </div>
    </div>
  )
}

export default page