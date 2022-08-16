import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestQuestions from "./TestQuestions";
import TestTimer from "./TestTimer";

import "../stylesheets/Test.css"

export default function Test(props) {

    const test = props.test;

    const params = useParams();
    const currentTestName = params.currentTest;
    
    const [stats, setStats] = useState(
        { 
            answered: 0, 
            correct: 0 
        }
    );
    const updateStats = (corr) => setStats(prevState => ({
        ...prevState,
        answered: (prevState.answered + 1),
        correct: (corr ? prevState.correct + 1 : prevState.correct)
    }));

    useEffect(() => {
        setStats(
        { 
            answered: 0, 
            correct: 0 
        });
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
                        <TestTimer test={test} />
                    </section>

                    <section className="test-header">
                        <Typography variant="h5">Bodovi: {stats.correct} / {stats.answered}</Typography>
                    </section>

                </div>

                <TestQuestions test={test} updateStats={updateStats} />

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
