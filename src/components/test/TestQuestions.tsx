import { Paper } from "@mui/material";
import React from "react";
import { Question as QuestionType, Test as TestType } from "../../api/ApiTypes"
import { QuestionStats, TestActionType } from "../../hooks/StatsHook";
import AbstractQuestion from "../questions/AbstractQuestion";

export default function TestQuestions(props: { test: TestType; 
                                               finishSignal: boolean;
                                               updateTestStats: (actionType: TestActionType, value: QuestionStats) => void; 
                                               addIncorrectAnswer: (answer: QuestionType) => void; }) {

    const test = props.test;

    return (
        
        <div className="test-questions">
            {test.questions.map((quest: QuestionType, idx: number) => (

                <Paper key={"paper-".concat(idx.toString())} elevation={3}>

                    <AbstractQuestion test={test} 
                                      finishSignal={props.finishSignal} 
                                      updateTestStats={props.updateTestStats} 
                                      addIncorrectAnswer={props.addIncorrectAnswer} 
                                      question={quest} />
                              
                </Paper>
            
            ))}
        </div>

    )

}
