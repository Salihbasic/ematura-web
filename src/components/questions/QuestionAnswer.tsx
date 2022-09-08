import { Button } from "@mui/material";
import React from "react";
import { Answered } from "./Question";

export default function QuestionAnswer(props: { answerHandler: (corr: boolean) => void; 
                                                answered: Answered; 
                                                answerText: string; 
                                                correct: boolean; }) {

    const answerHandler = props.answerHandler;
    const answered = props.answered;

    const answerText = props.answerText;
    const correct = props.correct;

    return (
        <Button
            onClick={() => answerHandler(correct)}
            color={
                answered.answered ? 
                    (correct ? "success" : "error") : "primary"
            }
            variant={answered.answered ? "contained" : "outlined"}
        >
            {answerText}
        </Button>
    )

}