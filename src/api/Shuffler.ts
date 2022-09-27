import { Question, Test } from "./ApiTypes";

export const shuffleTest = (test: Test) => fyShuffle(test.questions);

export const shuffleQuestions = (questions: Question[]) => fyShuffle(questions);

/*
    Basic implementation of the Fisher-Yates shuffle algorithm.

    We use it here to shuffle the array of question objects passed onto the 
    component as a property before rendering it, so as to ensure randomised
    order.
*/
const fyShuffle = (array: Question[]) => {

    var m = array.length;
    var i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        [array[m], array[i]] = [array[i], array[m]]

    }

    return array;

}
