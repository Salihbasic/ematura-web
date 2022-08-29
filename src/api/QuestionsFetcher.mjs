import data from "../data/bosanski.json"

export const getQuestionsByName = (name) => {
 
    return data[name].map((q, idx) => getQuestion(q, idx));

}

export const getQuestion = (question) => {

    const qtype = question.type;
    const text = question.question;

    if (qtype === "zaokruzi") {
        
        return {
            type: qtype,
            qText: text,
            answers: getZaokruziAnswers(question)
        };

    }

    if (qtype === "da-ne") {

        return {
            type: qtype,
            qText: text,
            answers: getDaNeAnswers(question)
        };

    }

    if (qtype === "dopuni") {

        return {
            type: qtype,
            qText: text,
            answers: getDopuniAnswers(question)
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

const getDopuniAnswers = (dopuni) => {

    return dopuni.rightAnswers;

}