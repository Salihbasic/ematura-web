import data from "../data/bosanski.json"

export const getQuestionsByFile = (file) => data[file];

export const getQuestion = (questions, idx) => {

    const q = questions[idx];
    const qtype = q.type;

    if (qtype === "zaokruzi") {
        
        return {
            type: qtype,
            qText: q.question,
            answers: fyShuffle(getZaokruziAnswers(q))
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

/*
    Basic implementation of the Fisher-Yates shuffle algorithm.

    We use it here to shuffle the array of question objects passed onto the 
    component as a property before rendering it, so as to ensure randomised
    order.
*/
const fyShuffle = (array) => {

    var m = array.length;
    var i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        [array[m], array[i]] = [array[i], array[m]]

    }

    return array;

}