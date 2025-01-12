export type question = {
    strokes: number;
    grade: number;
    freq: number;
    jlpt_old: number;
    jlpt_new: number;
    meanings: string[];
    readings_on: string[];
    readings_kun: string[];
    character: string;
    choices: string[];
}

export type questionList = question[]

export type kanji = {
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