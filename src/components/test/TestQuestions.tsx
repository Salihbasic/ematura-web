import { Paper } from "@mui/material";
import React from "react";
import { Question as QuestionType, Test as TestType } from "../../api/ApiTypes"
import { TestStats } from "./Test";
import AbstractQuestion from "../questions/AbstractQuestion";

export default function TestQuestions(props: { test: TestType; 
                                               finishSignal: boolean;
                                               updateStats: (option: boolean | TestStats) => void; 
                                               addIncorrectAnswer: (answer: QuestionType) => void; }) {

    const test = props.test;

    return (
        
        <div className="test-questions">
            {test.questions.map((quest: QuestionType, idx: number) => (

                <Paper key={"paper-".concat(idx.toString())} elevation={3}>

                    <AbstractQuestion test={test} 
                                      finishSignal={props.finishSignal} 
                                      updateStats={props.updateStats} 
                                      addIncorrectAnswer={props.addIncorrectAnswer} 
                                      question={quest} />
                              
                </Paper>
            
            ))}
        </div>

    )

}
