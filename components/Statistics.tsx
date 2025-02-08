import React from 'react'

const DailyStreak = () => {
  return (
    <div className='p-5 rounded border border-gray-600 flex justify-evenly'>
        <div className="text-center">
          <h1 className='text-3xl'>1日</h1>
          <p className='text-zinc-400 text-xs'>Current Streak</p>
        </div>
        <div className="text-center">
          <h1 className='text-3xl'>1日</h1>
          <p className='text-zinc-400 text-xs'>Best Streak</p>
          </div>
        <div className="text-center">
          <h1 className='text-3xl'>1月31日</h1>
          <p className='text-zinc-400 text-xs'>Last Study</p>
        </div>
    </div>
  )
}

export default DailyStreak