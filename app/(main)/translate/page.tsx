"use client"
import React, { useState } from 'react'

type vocab = {
    kanji: string,
    kana: string[],
    meaning : string[]
}

const Page = () => {
    const [jpText, setJpText] = useState("")
    const [translation, settranslation] = useState("")
    const [vocabs, setVocabs] = useState<vocab[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const getTranslation = async () => {
        try {
            setIsLoading(true)
            const requestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({message: jpText}) 
            };
            const resp = await fetch('/api/translate', requestOptions);
            const result = await resp.json();
            setVocabs(result.vocabs);
            settranslation(result.translation)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='p-5'>
        <h1 className='text-2xl mb-5'>Translate JP &gt; EN</h1>
        <div className='grid md:grid-cols-2 gap-5 '>
            <div className='bg-zinc-700 rounded h-64 p-5 flex flex-col gap-5'>
                <textarea onChange={(e) => setJpText(e.target.value)} value={jpText} className='bg-zinc-700 rounded w-full focus:outline-none focus:ring-0 resize-none flex-grow [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full' name="" id=""></textarea>
                <button disabled={isLoading || jpText.length === 0} onClick={getTranslation} className='bg-teal-600 hover:bg-teal-700 py-1.5 px-3 rounded self-end'>
                    {!isLoading ? 'Translate' : <svg className="size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}</button>
            </div>
            
            <div className='bg-zinc-700 rounded h-64 p-5 flex '>
                <div className="flex-grow overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <p>{translation}</p>
                </div>
            </div>
        </div>
        {vocabs.length > 0 && (
            <>
            <h1 className='text-2xl my-5'>Detected Vocabularies</h1>
            <div className="flex flex-col gap-5 flex-wrap">
                {vocabs.map((vocab, index) => (
                    <div key={index} className="text-2xl lg:text-5xl border border-gray-600 p-5 rounded">{vocab.kanji}</div>
                ))}
            </div>
            </>
        )}
    </div>
  )
}

export default Page