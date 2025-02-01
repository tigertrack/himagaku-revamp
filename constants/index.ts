type jlptLevel = {
    level: string;
    title: string;
    count: number;
}

export enum jlptLevelNames {
    n1 = "Mastery",
    n2 = "Advance",
    n3 = "Intermediate",
    n4 = "Elementary",
    n5 = "Basic"
}

export const jlptLevels: jlptLevel[] = [
    { level: "1", title: jlptLevelNames.n1, count: 1232 }, 
    { level: "2", title: jlptLevelNames.n2, count: 367}, 
    { level: "3", title: jlptLevelNames.n3, count: 367}, 
    { level: "4", title: jlptLevelNames.n4, count: 367}, 
    { level: "5", title: jlptLevelNames.n5,  count: 367}
]