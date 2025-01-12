import type { kanji, question } from "@/types"

export const getQuestions = (count: number, level: number, KanjiDict: kanji[]): question[] => {
    const charOnly = KanjiDict.filter(kanji => kanji.jlpt_new == level).map(kanji => kanji.character)
    return randomizer(KanjiDict.filter((kanji) => kanji.jlpt_new == level), count).map(kanji => {
        const nonAnswer = randomizer(charOnly.filter((char) => char != kanji.character), 7)
        const choices = randomizer([...nonAnswer, kanji.character])
        return {...kanji, choices}
    })
}

export const randomizer = (arr: any[], count=arr.length) => {
    const shuffled = arr.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

export const isCorrectAnswer = (correct: string, actual: string) => correct == actual
