import type { kanjiInfo } from "@/types"

export const getQuestions = (count: number, level: number, KanjiDict: kanjiInfo[]) => {
    const charOnly = KanjiDict.map(kanji => kanji.character)
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
