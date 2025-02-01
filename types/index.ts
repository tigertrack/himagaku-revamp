export type question = {
    character: string;
    primary_hint: string[];
    secondary_hint?: string[];
    meanings?: string[];
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

export type kana = {
    character: string;
    reading: string;
    kanaType: number;
}

export type sourceType = 'kanji' | 'kana';