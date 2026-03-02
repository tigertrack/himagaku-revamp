import Dexie, { Table } from "dexie";
import type { kanji, kana, translatedVocab } from "@/types";

export class himagakuDB extends Dexie {
  kanjiList!: Table<kanji>;
  kanaList!: Table<kana>;
  translatedVocabs!: Table<translatedVocab>;
  constructor() {
    super("himagaku");
    this.version(1).stores({
      kanjiList:
        "++id,strokes,grade,freq,jlpt_old,jlpt_new,meanings,readings_on,readings_kun,wk_level,wk_meanings,wk_readings_on,wk_readings_kun,wk_radicals,character",
      kanaList:
        "++id,character,reading,kanaType"
    });
    this.version(2).stores({
      kanjiList:
        "++id,strokes,grade,freq,jlpt_old,jlpt_new,meanings,readings_on,readings_kun,wk_level,wk_meanings,wk_readings_on,wk_readings_kun,wk_radicals,character",
      kanaList:
        "++id,character,reading,kanaType",
      translatedVocabs: "++id,&vocab,freq"
    });
  }
}

export const db = new himagakuDB();

const populateKanji = async (db: himagakuDB) => {
  const count = await db.kanjiList.toCollection().count();
  if (count == 0) {
    const baseUrl = window.location.origin;
    const res = await fetch(baseUrl + "/json/kanjiChars.json");
    const data = await res.json();
    await db.kanjiList.bulkAdd(data);
  }
};

const populateKana = async (db: himagakuDB) => {
  const baseUrl = window.location.origin;
  const count = await db.kanaList.toCollection().count();
  if (count == 0) {
    const res = await fetch(baseUrl + "/json/kanaChars.json");
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

export const upsertTranslatedVocab = async (vocab: string) => {
  const existing = await db.translatedVocabs.where("vocab").equals(vocab).first();
  if (existing && existing.id !== undefined) {
    await db.translatedVocabs.update(existing.id, { freq: existing.freq + 1 });
  } else {
    await db.translatedVocabs.add({ vocab, freq: 1 });
  }
};
