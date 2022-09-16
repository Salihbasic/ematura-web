import { Paper } from "@mui/material";
import React from "react";
import { Question as QuestionType, Test as TestType } from "../../api/ApiTypes"
import { TestStats } from "./Test";
import AbstractQuestion from "../questions_proper/AbstractQuestion";

export default function TestQuestions(props: { test: TestType; 
                                               updateStats: (option: boolean | TestStats) => void; 
                                               addIncorrectAnswer: (answer: QuestionType) => void; }) {

    const test = props.test;

    // const updateStats = props.updateStats;

    return (
        
        <div className="test-questions">
            {test.questions.map((quest: QuestionType) => (

                <Paper elevation={3}>

                    <AbstractQuestion test={test} question={quest} />
                              
                </Paper>
            
            ))}
        </div>

    )

}
