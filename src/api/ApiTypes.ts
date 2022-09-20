interface Test {

    name: string,
    length: number,
    questions: Question[]

}

interface Question {

    type: "zaokruzi" | "dopuni" | "da-ne",
    question: string,
    answers: ButtonAnswer[] | DopuniAnswer

}

interface ButtonAnswer {

    answer: string,
    isCorrect: boolean

}

interface DopuniAnswer {

    [answer: string]: string[]

}

export { Test, Question, ButtonAnswer, DopuniAnswer };