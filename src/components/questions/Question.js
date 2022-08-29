import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionAnswer from "./QuestionAnswer";

import "../stylesheets/Question.css";
import DopuniAnswer from "./DopuniAnswer";

export default function Question(props) {

    const test = props.test;
    const qidx = props.qidx;

    const updateStats = props.updateStats;
    const addWrongAnswer = props.addWrongAnswer;

    const question = props.question;

    const text = question.qText.replaceAll(/\{{3}[\S]*\}{3}/ig, "______");
    const answers = question.answers;
    
    /* Used by TextField in DopuniAnswer to prevent changes after answer is given */
    const [specificValues, setSpecificValues] = useState([{}]);
    const handleSpecificValues = (label, corr) => {

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

    const [answered, setAnswered] = useState({ answered: false, correct: false });
    const answerHandler = (corr) => {
        updateStats(corr);

        if (question.type === "dopuni" && Object.keys(answers).length)

        setAnswered({ answered: true, correct: corr });

        if (!corr) {
            addWrongAnswer(qidx);
        }
    }

    useEffect(() => {
        setAnswered({ answered: false, correct: false });
    }, [test]);

    useEffect(() => {
        setSpecificValues([{}]);
    }, [test]);

    return (

        <div className="question">

            <Typography variant="h6">
                {text}
            </Typography>

            <div className="question-answers">
            
            {question.type !== "dopuni" &&
                answers.map((answer, idx) => (

                    <QuestionAnswer key={idx} 
                                    correct={answer.isCorrect}
                                    answered={answered}
                                    answerHandler={answerHandler}
                                    answerText={answer.answer} />

                ))
            }

            {question.type === "dopuni" &&
                Object.entries(answers).map(([key, value], idx) => (

                    <DopuniAnswer key={idx}
                                  label={key}
                                  answered={answered}
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