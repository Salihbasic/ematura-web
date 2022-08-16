import { Paper } from "@mui/material";
import Question from "../questions/Question";

export default function TestQuestions(props) {

    const test = props.test;
    const updateStats = props.updateStats;

    return (
        
        <div className="test-questions">
            {test.questions.map((quest, idx) => (

                <Paper elevation={3}>
                    <Question key={idx} test={test} question={quest} updateStats={updateStats} />
                </Paper>
            
            ))}
        </div>

    )

}
