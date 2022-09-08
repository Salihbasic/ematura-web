import { Paper } from "@mui/material";
import React from "react";
import Question from "../questions/Question";
import { Question as QuestionType, Test as TestType } from "../../api/ApiTypes"
import { TestStats } from "./Test";

export default function TestQuestions(props: { test: TestType; 
                                               updateStats: (option: boolean | TestStats) => void; 
                                               addIncorrectAnswer: (answer: QuestionType) => void; }) {

    const test = props.test;

    const updateStats = props.updateStats;

    return (
        
        <div className="test-questions">
            {test.questions.map((quest: QuestionType, idx: number) => (

                <Paper elevation={3}>

                    <Question key={idx} 
                              test={test} 
                              question={quest} 
                              updateStats={updateStats} 
                              addIncorrectAnswer={props.addIncorrectAnswer} />
                              
                </Paper>
            
            ))}
        </div>

    )

}
