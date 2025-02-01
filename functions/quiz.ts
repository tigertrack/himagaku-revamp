import type { kanji, question, sourceType } from "@/types";
import { db } from "@/functions/dexie";

enum kanaType {
    HIRAGANA=1,
    KATAKANA=2,

}

export const getKanjiQuestions = (
  count: number,
  level: number,
  KanjiDict: kanji[]
): question[] => {
  const charOnly = KanjiDict.filter((kanji) => kanji.jlpt_new == level).map(
    (kanji) => kanji.character
  );
  return randomizer(
    KanjiDict.filter((kanji) => kanji.jlpt_new == level),
    count
  ).map((kanji) => {
    const nonAnswer = randomizer(
      charOnly.filter((char) => char != kanji.character),
      7
    );
    const choices = randomizer([...nonAnswer, kanji.character]);
    return {
      character: kanji.character,
      primary_hint: kanji.readings_kun,
      secondary_hint: kanji.readings_on,
      meanings: kanji.meanings,
      choices,
    };
  });
};

const getKanaQuestions = (count: number, kanaType: number, kanaDict: any[]) => {
  const filteredKana = kanaDict.filter((kana) => kana.kanaType == kanaType);
  const charOnly = filteredKana.map((kana) => kana.character);
  return randomizer(filteredKana, count).map((kana) => {
    const nonAnswer = randomizer(
      charOnly.filter((char) => char != kana.character),
      7
    );
    const choices = randomizer([...nonAnswer, kana.character]);
    return {
      character: kana.character,
      primary_hint: [kana.reading],
      choices,
    };
  });
};

export const randomizer = (arr: any[], count = arr.length) => {
  const shuffled = arr.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const isCorrectAnswer = (correct: string, actual: string) =>
  correct == actual;

export const generateQuestions = async (
    type: sourceType,
    level: number,
    questionCount: number
) => {
  let questions: question[] = [];
  if (type == "kanji") {
    const kanjiDict = await db.kanjiList.toArray();
    questions = getKanjiQuestions(questionCount, level, kanjiDict);
  } else if (type == "kana" && level == kanaType.KATAKANA) {
    const kanaDict = await db.kanaList.toArray();
    questions = getKanaQuestions(questionCount, kanaType.KATAKANA, kanaDict);
  } else if (type == "kana"  && level == kanaType.HIRAGANA) {
    const kanaDict = await db.kanaList.toArray();
    questions = getKanaQuestions(questionCount, kanaType.HIRAGANA, kanaDict);
  }
  return questions;
};
