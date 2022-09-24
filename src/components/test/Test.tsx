import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TestQuestions from "./TestQuestions";
import TestTimer from "./TestTimer";

import "../stylesheets/Test.css"
import FinishButton from "./FinishButton";
import { Question, Test as TestType } from "../../api/ApiTypes";
import React from "react";
import { useTestStats } from "../../hooks/StatsHook";

export default function Test(props: { test: TestType; changeTest: (testName: string | TestType) => void}) {

    const test = props.test;

    const [stats, updateTest, resetTest] = useTestStats(test);
    
    const [finished, setFinished] = useState(false);
    const [finishSignal, setFinishSignal] = useState(false);
   
    const finishHandler = () => {
        setFinishSignal(true);
        setFinished(true);
    }

    const [incorrectlyAnswered, setIncorrectlyAnswered] = useState<Question[]>([]);
    const addIncorrectAnswer = (answer: Question) => setIncorrectlyAnswered(previous => [...previous, answer])
    
    const restartWithIncorrectlyAnswered = () => props.changeTest({name: test.name, length: test.length, questions: incorrectlyAnswered});

    useEffect(() => {

        setFinished(false);
        setFinishSignal(false);

        setIncorrectlyAnswered([]);

        resetTest();

    // eslint-disable-next-line    
    }, [test]);

    return (

        <>

            {test && 

                <>

                <div className="test">

                    <section className="test-header">
                        <Typography variant="h5">Test: {test.name}</Typography>
                    </section>

                    <section className="test-header">
                        <TestTimer test={test} finished={finished} />
                    </section>

                    <section className="test-header">
                        <Typography variant="h5">Bodovi: {stats.answeredCorrect} / {stats.rightAnswers}</Typography>
                    </section>

                </div>

                <TestQuestions test={test} 
                               updateTestStats={updateTest}
                               finishSignal={finishSignal} 
                               addIncorrectAnswer={addIncorrectAnswer} />

                <div className="test-footer">
                    <FinishButton finishHandler={finishHandler} stats={stats} restartHandler={restartWithIncorrectlyAnswered} />
                </div>

                </>
            }

            {!test &&
            
                <div className="null-test">

                    <Typography variant="h5">
                        Test ne postoji!
                    </Typography>

                </div>
            
            }

        </>

    )

}