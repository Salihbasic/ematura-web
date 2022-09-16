import { Typography } from "@mui/material";
import React from "react";
import { ButtonAnswer, DopuniAnswer, Question, Test } from "../../api/ApiTypes";
import ButtonAnswers from "./ButtonAnswers";

import "../stylesheets/Question.css";
import DopuniAnswers from "./DopuniAnswers";

export default function AbstractQuestion(props: { test: Test; 
                                                  question: Question }) {

    const qType = props.question.type;
    const qText = props.question.question.replaceAll(/\{{3}[\S]*\}{3}/ig, "______");
    
    const qAnswers = props.question.answers;

    return (

        <div className="question">

            <Typography variant="h6">
                {qText}
            </Typography>

            {qType !== "dopuni" && <ButtonAnswers answers={(qAnswers as ButtonAnswer[])} />}

            {qType === "dopuni" && <DopuniAnswers answers={(qAnswers as DopuniAnswer)} />}

        </div>

    )

}