"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/functions/dexie'
import type { translatedVocab } from '@/types'

const Page = () => {
    const [vocabs, setVocabs] = useState<translatedVocab[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadVocabs = async () => {
            try {
                const data = await db.translatedVocabs
                    .orderBy('freq')
                    .reverse()
                    .toArray();
                setVocabs(data);
            } catch (error) {
                console.error('Failed to load vocab progress:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadVocabs();
    }, []);

    return (
        <div className='p-5 max-w-3xl mx-auto'>
            <h1 className='text-2xl mb-2'>Vocabulary Progress</h1>
            <p className='text-zinc-400 mb-6 text-sm'>
                Tracks how many times each vocabulary has appeared in your translations.
            </p>

            {isLoading ? (
                <div className='flex justify-center items-center h-48'>
                    <svg className="size-8 animate-spin text-teal-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            ) : vocabs.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-48 text-zinc-400 gap-2'>
                    <p className='text-lg'>No vocabulary recorded yet.</p>
                    <p className='text-sm'>Head over to the <a href='/translate' className='text-teal-400 hover:underline'>Translate</a> page and start translating!</p>
                </div>
            ) : (
                <div className='rounded-lg border border-zinc-700 overflow-hidden'>
                    <table className='w-full text-sm'>
                        <thead className='bg-zinc-800 text-zinc-300 uppercase text-xs tracking-wider'>
                            <tr>
                                <th className='px-5 py-3 text-left w-12'>#</th>
                                <th className='px-5 py-3 text-left'>Vocabulary</th>
                                <th className='px-5 py-3 text-right'>Occurrences</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vocabs.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className='border-t border-zinc-700 even:bg-zinc-800/40 hover:bg-zinc-700/50 transition-colors'
                                >
                                    <td className='px-5 py-3 text-zinc-500'>{index + 1}</td>
                                    <td className='px-5 py-3 text-xl'>{item.vocab}</td>
                                    <td className='px-5 py-3 text-right'>
                                        <span className='inline-flex items-center justify-center bg-teal-600/20 text-teal-400 rounded-full px-3 py-0.5 text-xs font-semibold'>
                                            {item.freq} ×
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Page
