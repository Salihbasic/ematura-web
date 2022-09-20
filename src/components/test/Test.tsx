import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TestQuestions from "./TestQuestions";
import TestTimer from "./TestTimer";

import "../stylesheets/Test.css"
import FinishButton from "./FinishButton";
import { Question, Test as TestType } from "../../api/ApiTypes";
import React from "react";

export default function Test(props: { test: TestType; changeTest: (testName: string | TestType) => void}) {

    const test = props.test;

    const [stats, updateStats] = useStatistics(test);
    
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

        updateStats(
            { 
                total: test.questions.length, /* Total number of solved questions */
                answered: 0, 
                correct: 0,
                incorrect: 0,
                unanswered: test.questions.length /* Since they are not technically incorrect */ 
            }
        );

    }, [test]);

    useEffect(() => {

        setFinished(false);
        setFinishSignal(false);

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
                        <Typography variant="h5">Bodovi: {stats.correct} / {stats.answered}</Typography>
                    </section>

                </div>

                <TestQuestions test={test} updateStats={updateStats} finishSignal={finishSignal} addIncorrectAnswer={addIncorrectAnswer} />

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

export interface TestStats {

    total: number,
    
    answered: number,
    unanswered: number,

    correct: number,
    incorrect: number

}

const useStatistics = (test: TestType): [TestStats, (option: boolean | TestStats) => void] => {

    const [stats, setStats] = useState<TestStats>(
        { 
            total: test.questions.length, /* Total number of solved questions */
            answered: 0, 
            correct: 0,
            incorrect: 0,
            unanswered: test.questions.length /* Since they are not technically incorrect */ 
        }
    );

    var updateStats = (option: boolean | TestStats) => {
        
        if (typeof option === "boolean") {

            setStats(prevState => ({
            ...prevState,
            
            answered: (prevState.answered + 1),
            unanswered: (prevState.unanswered - 1), /* since this one is answered */
    
            correct: (option ? prevState.correct + 1 : prevState.correct),
            incorrect: (!option ? prevState.incorrect + 1 : prevState.incorrect)
    
            }));

        } else {

            setStats(prevState => ({
                ...prevState,

                ...option
            }));

        }

    };

    return [stats, updateStats];

}