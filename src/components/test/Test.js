import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestQuestions from "./TestQuestions";
import TestTimer from "./TestTimer";

import "../stylesheets/Test.css"
import FinishButton from "./FinishButton";

export default function Test(props) {

    const test = props.test;
    const addNewTest = props.addNewTest;

    const params = useParams();
    const currentTestName = params.currentTest;
    
    const [stats, setStats] = useState(
        { 
            total: test.questions.length, /* Total number of solved questions */
            answered: 0, 
            correct: 0,
            incorrect: 0,
            unanswered: test.questions.length /* Since they are not technically incorrect */ 
        }
    );
    const updateStats = (corr) => setStats(prevState => ({
        ...prevState,
        
        answered: (prevState.answered + 1),
        unanswered: (prevState.unanswered - 1), /* since this one is answered */

        correct: (corr ? prevState.correct + 1 : prevState.correct),
        incorrect: (!corr ? prevState.incorrect + 1 : prevState.incorrect)
    }));

    const [wrongAnswers, setWrongAnswers] = useState(
        {
            name: test.name.concat("-wrong"),
            questions: []
        }
    );
    const addWrongAnswer = (idx) => setWrongAnswers(current => ({
        ...current, 

        questions: [...current.questions, test.questions[idx]]
    }));

    const [finished, setFinished] = useState(false);
    const finishHandler = () => setFinished(true);

    useEffect(() => {
        setStats(
            { 
                total: test.questions.length, /* Total number of solved questions */
                answered: 0, 
                correct: 0,
                incorrect: 0,
                unanswered: test.questions.length /* Since they are not technically incorrect */ 
            });
    }, [test]);

    useEffect(() => {
        setFinished(false);
    }, [test]);

    useEffect(() => {
        setWrongAnswers(
            {
                name: test.name.concat("-wrong"),
                questions: []
            }
        );
    }, [test]);

    return (

        <>

            {test && 

                <>

                <div className="test">

                    <section className="test-header">
                        <Typography variant="h5">Test: {currentTestName}</Typography>
                    </section>

                    <section className="test-header">
                        <TestTimer test={test} finished={finished} />
                    </section>

                    <section className="test-header">
                        <Typography variant="h5">Bodovi: {stats.correct} / {stats.answered}</Typography>
                    </section>

                </div>

                <TestQuestions test={test} updateStats={updateStats} addWrongAnswer={addWrongAnswer} />

                <div className="test-footer">
                    <FinishButton finishHandler={finishHandler} stats={stats} wrongAnswers={wrongAnswers} addNewTest={addNewTest} />
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
