import React from 'react'
import { redirect } from 'next/navigation'
import Quiz from '@/components/screen/Quiz'
const KanjiQuiz = async ({
  params,
}: {
  params: Promise<{ level: string }>
}) => {
  const levelParam = (await params).level
  const level = parseInt(levelParam)
  if(level > 5 || level < 1) redirect('/')
  const quizSubtitle = level == 1 ? 'Hiragana' : level == 2 ? 'Katakana' : ''
  return (
    <>
    <Quiz level={level} sourceType='kana' quizTitle='Fundamental' quizSubtitle={quizSubtitle} />
    </>
  )
}

export default KanjiQuiz