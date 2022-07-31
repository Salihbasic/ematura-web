import data from "../data/bosanski.json"

export const getQuestionsByFile = (file) => data[file];

export const getQuestion = (questions, idx) => {

    const q = questions[idx];
    const qtype = q.type;

    if (qtype === "zaokruzi") {
        
        return {
            type: qtype,
            qText: q.question,
            answers: getZaokruziAnswers(q)
        };

    }

    if (qtype === "da-ne") {

        return {
            type: qtype,
            qText: q.question,
            answers: getDaNeAnswers(q)
        };

    }

};

const getZaokruziAnswers = (zaoq) => {


    const rAnswr = zaoq.rightAnswers.map(answr => ({
        answer: answr,
        isCorrect: true
    }));
    
    const wAnswr = zaoq.wrongAnswers.map(answr => ({
        answer: answr,
        isCorrect: false
    }));

    return [...rAnswr, ...wAnswr];

};

const getDaNeAnswers = (dane) => {

    const rAnswr = dane.rightAnswer;

    return [
        { answer: "Da", isCorrect: rAnswr }, 
        { answer: "Ne", isCorrect: !rAnswr }
    ]

}