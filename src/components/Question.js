import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionAnswer from "./QuestionAnswer";

import "./style/Question.css";

export default function Question(props) {

    const test = props.test;

    const updateStats = props.updateStats;

    const [answered, setAnswered] = useState({ answered: false, correct: false });
    const answerHandler = (corr) => {
        updateStats(corr);
        setAnswered({ answered: true, correct: corr });
    }

    useEffect(() => {
        setAnswered({ answered: false, correct: false });
    }, [test]);

    const question = props.question;

    const text = question.qText;
    const answers = question.answers;

    return (

        <div className="question">

            <Typography variant="body1">
                {text}
            </Typography>

            <div className="question-answers">
            {answers.map((answer, idx) => (

                <QuestionAnswer key={idx} correct={answer.isCorrect}
                                answered={answered}
                                answerHandler={answerHandler}
                                answerText={answer.answer} />

            ))}
            </div>

        </div>

    )

}