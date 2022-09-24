import { useReducer } from "react";
import { ButtonAnswer, DopuniAnswer, Question, Test } from "../api/ApiTypes";

export interface QuestionStats {

    rightAnswers: number;

    answeredCorrect: number;

    answeredIncorrect: number;

    unanswered: number;

}

type State = QuestionStats;

export type QuestionActionType = "correct" | "incorrect" | "reset";
export type TestActionType = "update" | "reset";

type QuestionAction = {type: QuestionActionType};
type TestAction = { type: TestActionType; value: State }

export const useQuestionStats = (question: Question): [QuestionStats, (answered: QuestionActionType) => void] => {

    const countCorrectAnswers = () => {

        var count = 0;
        
        if (question.type === "dopuni") {

            const answers = question.answers as DopuniAnswer;
            count += Object.keys(answers).length;

        } else {

            const answers = question.answers as ButtonAnswer[];
            count += answers.filter(a => a.isCorrect).length;

        }

        return count;

    }

    const defaultVal: QuestionStats = {

        rightAnswers: countCorrectAnswers(),

        answeredCorrect: 0,

        answeredIncorrect: 0,

        unanswered: countCorrectAnswers()

    }

    const init = (): QuestionStats => {
        return defaultVal;
    }

    const questionStatsReducer = (state: State, action: QuestionAction): QuestionStats => {

        switch (action.type) {
    
            case 'correct':
    
                return {
                    ...state,
                    answeredCorrect: state.answeredCorrect + 1,
                    unanswered: state.unanswered - 1
                }
            
            case 'incorrect':
    
                return {
                    ...state,
                    answeredIncorrect: state.answeredIncorrect + 1,
                    unanswered: state.unanswered - 1
                }
    
            case 'reset':
                return init();
    
        }
    
    }
 
    const [stats, dispatch] = useReducer(questionStatsReducer, defaultVal, init);

    const updateStats = (answered: QuestionActionType) => dispatch({type: answered});

    return [stats, updateStats]

}

export const useTestStats = (test: Test): [QuestionStats, (actionType: TestActionType, value: State) => void, () => void] => {

    const countTotalAnswers = () => {

        var count = 0;
        for (const question of test.questions) {

            if (question.type === "dopuni") {
    
                const answers = question.answers as DopuniAnswer;
                count += Object.keys(answers).length;
    
            } else {
    
                const answers = question.answers as ButtonAnswer[];
                count += answers.filter(a => a.isCorrect).length;
    
            }

        }
        

        return count;

    }

    const defaultVal: QuestionStats = {

        rightAnswers: countTotalAnswers(),

        answeredCorrect: 0,

        answeredIncorrect: 0,

        unanswered: countTotalAnswers()

    }

    const init = () => {
        return defaultVal;
    }

    const testStatsReducer = (state: State, action: TestAction): QuestionStats => {

        switch(action.type) {

            case 'update':

                return {
                    ...state,
                    answeredCorrect: state.answeredCorrect + action.value.answeredCorrect,
                    answeredIncorrect: state.answeredIncorrect + action.value.answeredIncorrect,
                    unanswered: state.unanswered - (action.value.answeredCorrect + action.value.answeredIncorrect)
                }
            
            case 'reset':
                return init();

        }

    }

    const [stats, dispatch] = useReducer(testStatsReducer, defaultVal, init);

    const updateTest = (actionType: TestActionType, value: State) => dispatch({type: actionType, value: value});
    const resetTest = () => dispatch({type: "reset", value: defaultVal})

    return [stats, updateTest, resetTest];

}