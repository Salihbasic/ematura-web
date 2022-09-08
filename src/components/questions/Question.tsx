import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionAnswer from "./QuestionAnswer";
import { Test as TestType, Question as QuestionType, ButtonAnswer, DopuniAnswer as DopuniAnswerType } from "../../api/ApiTypes";

import "../stylesheets/Question.css";
import DopuniAnswer from "./DopuniAnswer";
import { TestStats } from "../test/Test";
import React from "react";

export default function Question(props: { test: TestType; 
                                          updateStats: (option: boolean | TestStats) => void; 
                                          question: QuestionType; 
                                          addIncorrectAnswer: (answer: QuestionType) => void;
                                        }) {

    const test = props.test;

    const updateStats = props.updateStats;

    const question = props.question;

    const text = question.question.replaceAll(/\{{3}[\S]*\}{3}/ig, "______");
    const answers = question.answers;
    
    /* Used by TextField in DopuniAnswer to prevent changes after answer is given */
    const [specificValues, setSpecificValues] = useState<SpecificValue[]>([{label: "", correct: false}]);
    const handleSpecificValues = (label: string, corr: boolean) => {

        setSpecificValues(currentVals => (

            [
                ...currentVals, 
                { 
                    label: label,
                    correct: corr
                }
            ]

        ));

    }

    const [answered, setAnswered] = useState<Answered>({ answered: false, correct: false });
    const answerHandler = (corr: boolean) => {
        updateStats(corr);

        setAnswered({ answered: true, correct: corr });

        if (!corr) {
            props.addIncorrectAnswer(question);
        }
        
    }

    useEffect(() => {
        setAnswered({ answered: false, correct: false });
    }, [test]);

    useEffect(() => {
        setSpecificValues([{label: "", correct: false}]);
    }, [test]);

    return (

        <div className="question">

            <Typography variant="h6">
                {text}
            </Typography>

            <div className="question-answers">
            
            {question.type !== "dopuni" &&
                (answers as ButtonAnswer[]).map((answer: ButtonAnswer, idx: number) => (

                    <QuestionAnswer key={idx} 
                                    correct={answer.isCorrect}
                                    answered={answered}
                                    answerHandler={answerHandler}
                                    answerText={answer.answer} />

                ))
            }

            {question.type === "dopuni" &&
                Object.entries((answers as DopuniAnswerType)).map(([key, value], idx) => (

                    <DopuniAnswer key={idx}
                                  label={key}
                                  answerHandler={answerHandler}
                                  correctAnswers={value}
                                  specificValues={specificValues}
                                  handleSpecificValues={handleSpecificValues} />  

                ))
            }

            </div>

        </div>

    )

}

export interface SpecificValue {

    label: string,
    correct: boolean

}

export interface Answered {

    answered: boolean,
    correct: boolean

}