import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ButtonAnswer, DopuniAnswer, Question, Test } from "../../api/ApiTypes";
import ButtonAnswers from "./ButtonAnswers";

import "../stylesheets/Question.css";
import DopuniAnswers from "./DopuniAnswers";
import { QuestionStats, TestActionType, useQuestionStats } from "../../hooks/StatsHook";

export default function AbstractQuestion(props: { test: Test; 
                                                  question: Question;
                                                  finishSignal: boolean;
                                                  updateTestStats: (actionType: TestActionType, value: QuestionStats) => void;
                                                  addIncorrectAnswer: (answer: Question) => void; }) {

    const qType = props.question.type;
    const qText = props.question.question.replaceAll(/\{{3}[\S]*\}{3}/ig, "______");
    
    const qAnswers = props.question.answers;

    const [stats, updateStats] = useQuestionStats(props.question);

    useEffect(() => {
        props.updateTestStats("update", stats);
    
    // eslint-disable-next-line
    }, [stats])

    return (

        <div className="question">

            <Typography variant="h6">
                {qText}
            </Typography>

            <Typography variant="h6">
                {stats.answeredCorrect} / {stats.rightAnswers}
            </Typography>

            {qType !== "dopuni" && <ButtonAnswers test={props.test} 
                                                  question={props.question}
                                                  answers={(qAnswers as ButtonAnswer[])} 
                                                  finishSignal={props.finishSignal} 
                                                  questionStats={stats}
                                                  updateQuestionStats={updateStats}
                                                  addIncorrectAnswer={props.addIncorrectAnswer} />}

            {qType === "dopuni" && <DopuniAnswers test={props.test} 
                                                  question={props.question} 
                                                  answers={(qAnswers as DopuniAnswer)}
                                                  finishSignal={props.finishSignal}
                                                  questionStats={stats}
                                                  updateQuestionStats={updateStats}
                                                  addIncorrectAnswer={props.addIncorrectAnswer} />}

        </div>

    )

}