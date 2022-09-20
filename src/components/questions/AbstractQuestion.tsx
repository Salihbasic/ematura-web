import { Typography } from "@mui/material";
import React from "react";
import { ButtonAnswer, DopuniAnswer, Question, Test } from "../../api/ApiTypes";
import ButtonAnswers from "./ButtonAnswers";

import "../stylesheets/Question.css";
import DopuniAnswers from "./DopuniAnswers";
import { TestStats } from "../test/Test";

export default function AbstractQuestion(props: { test: Test; 
                                                  question: Question;
                                                  finishSignal: boolean;
                                                  updateStats: (option: boolean | TestStats) => void; 
                                                  addIncorrectAnswer: (answer: Question) => void; }) {

    const qType = props.question.type;
    const qText = props.question.question.replaceAll(/\{{3}[\S]*\}{3}/ig, "______");
    
    const qAnswers = props.question.answers;

    return (

        <div className="question">

            <Typography variant="h6">
                {qText}
            </Typography>

            {qType !== "dopuni" && <ButtonAnswers test={props.test} 
                                                  question={props.question}
                                                  answers={(qAnswers as ButtonAnswer[])} 
                                                  finishSignal={props.finishSignal} 
                                                  updateStats={props.updateStats} 
                                                  addIncorrectAnswer={props.addIncorrectAnswer} />}

            {qType === "dopuni" && <DopuniAnswers test={props.test} 
                                                  question={props.question} 
                                                  answers={(qAnswers as DopuniAnswer)}
                                                  finishSignal={props.finishSignal} 
                                                  updateStats={props.updateStats} 
                                                  addIncorrectAnswer={props.addIncorrectAnswer} />}

        </div>

    )

}