import Dexie, { Table } from 'dexie';
type kanji = {
    strokes: number;
    grade: number;
    freq?: number;
    jlpt_old: number;
    jlpt_new: number;
    meanings: string[];
    readings_on?: string[];
    readings_kun?: string[];
    wk_level?: number;
    wk_meanings?: string[];
    wk_readings_on?: string[];
    wk_readings_kun?: string[];
    wk_radicals?: string[];
    character: string
}
export class himagakuDB extends Dexie {
    kanjiList!: Table<kanji>;
  constructor() {
    super('himagaku');
    this.version(1).stores({
        kanjiList: '++id,strokes,grade,freq,jlpt_old,jlpt_new,meanings,readings_on,readings_kun,wk_level,wk_meanings,wk_readings_on,wk_readings_kun,wk_radicals,character',
    });
  }
}

export const db = new himagakuDB();

export const populate = async (db: himagakuDB) => {
  const count = await db.kanjiList.toCollection().count()
  if( count == 0){
    const res = await fetch('./json/kanjiChars.json');
    const data = await res.json();
    await db.kanjiList.bulkAdd(data)
  }
}