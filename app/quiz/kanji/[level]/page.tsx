import React from 'react'
import { redirect } from 'next/navigation'
import Quiz from '@/components/screen/Quiz'
import { jlptLevelNames } from '@/constants'
const KanjiQuiz = async ({
  params,
}: {
  params: Promise<{ level: string }>
}) => {
  const levelParam = (await params).level
  const level = parseInt(levelParam)
  if(level > 5 || level < 1) redirect('/')
    const nlevel = `n${level}`
  const quizTitle = jlptLevelNames[nlevel as keyof typeof jlptLevelNames]
  return (
    <Quiz level={level} sourceType='kanji' quizTitle={quizTitle} quizSubtitle={nlevel.toUpperCase()} />
  )
}

export default KanjiQuiz