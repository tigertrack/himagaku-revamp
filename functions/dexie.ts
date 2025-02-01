import Dexie, { Table } from "dexie";
import type { kanji, kana } from "@/types";

export class himagakuDB extends Dexie {
  kanjiList!: Table<kanji>;
  kanaList!: Table<kana>;
  constructor() {
    super("himagaku");
    this.version(1).stores({
      kanjiList:
        "++id,strokes,grade,freq,jlpt_old,jlpt_new,meanings,readings_on,readings_kun,wk_level,wk_meanings,wk_readings_on,wk_readings_kun,wk_radicals,character",
      kanaList:
        "++id,character,reading,kanaType"
    });
  }
}

export const db = new himagakuDB();

const populateKanji = async (db: himagakuDB) => {
  const count = await db.kanjiList.toCollection().count();
  if (count == 0) {
    const res = await fetch("./json/kanjiChars.json");
    const data = await res.json();
    await db.kanjiList.bulkAdd(data);
  }
};

const populateKana = async (db: himagakuDB) => {
  const count = await db.kanaList.toCollection().count();
  if (count == 0) {
    const res = await fetch("./json/kanaChars.json");
    const data = await res.json();
    await db.kanaList.bulkAdd(data);
  }
}

export const populateDB = async () => {
  await Promise.all([
    populateKanji(db),
    populateKana(db)
  ])
}
