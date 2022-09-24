import React, { useEffect, useRef, useState } from "react";
import { DopuniAnswer as DopuniAnswerType, Question, Test } from "../../api/ApiTypes";
import { QuestionActionType, QuestionStats } from "../../hooks/StatsHook";
import DopuniAnswer from "./DopuniAnswer";

export default function DopuniAnswers(props: { test: Test;
                                               question: Question; 
                                               answers: DopuniAnswerType; 
                                               finishSignal: boolean;
                                               questionStats: QuestionStats;
                                               updateQuestionStats: (answered: QuestionActionType) => void;
                                               addIncorrectAnswer: (answer: Question) => void; }) {

    const [filledFields, setFilledFields] = useState<FilledAnswers>({});
    const [answered, setAnswered] = useState<AnsweredField>({});
    
    /*
        This was honestly the biggest pain to solve in this whole project
        because the problem seemed ridiculous and illogical.

        It turns out, and it took me a while to figure this out, after
        eliminating dozens of other possibilities, that the event handler
        (in DopuniAnswer) only gets the previous snapshot of data, not
        the latest one after the update, which means that the state would
        always lag one letter behind the actual input.

        After a while of browsing, all thanks belong to Allah (s.w.t), I
        stumbled upon this broken-english blog post with a similar enough
        solution: https://file-translate.com/en/blog/react-state-in-event
    */
    const filledFieldsRef = useRef(filledFields);

    const handleFilling = (label: string, value: string) => {

        setFilledFields(Object.assign(filledFieldsRef.current, {[label]: value}));

    }

    useEffect(() => {
        
        if (props.finishSignal) {

            for (const [key, value] of Object.entries(filledFields)) {

                const isCorrect = Object.keys(props.answers).includes(key) && props.answers[key].includes(value)

                props.updateQuestionStats(isCorrect ? "correct" : "incorrect");

                if (!isCorrect) {
                    props.addIncorrectAnswer(props.question);
                }

                setAnswered(prev => ({...prev, [key]: isCorrect}));

            }

        }

    // eslint-disable-next-line    
    }, [props.finishSignal]);

    useEffect(() => {

        setFilledFields({});
        filledFieldsRef.current = {};

        setAnswered({});

        props.updateQuestionStats("reset");

    // eslint-disable-next-line    
    }, [props.test]);

    return (

        <div className="question-answers">
        
            {Object.keys(props.answers).map((label, idx) => (

                <DopuniAnswer key={"dopuni-".concat(idx.toString())} label={label} answered={answered} handleFilling={handleFilling} />

            ))}
    
        </div>

    )

}

export interface FilledAnswers {

    [label: string]: string

}

export interface AnsweredField {

    [label: string]: boolean

}