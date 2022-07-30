import { Typography, Box } from "@mui/material";
import { useState } from "react";
import { ZaokruziButton } from "./QuestionButtons.mjs";

function QuestionText(props) {

    const text = props.text;

    return (
        <Box alignItems="center">
            <Typography variant="h4">{text}</Typography>
        </Box>
    )

}

export default function Question(props) {

    const [answered, setAnswered] = useState(false);
    const answerClickHandler = () => {
        if (!answered) {
            setAnswered(true);
        }
    }
    
    const questionText = props.questionText;
    const questionAnswers = props.questionAnswers;

    return (
        <Box>
            <QuestionText text={questionText} />

            <Box
                border="1px dashed red"
            >

                {questionAnswers.map(answr => {
                    return (<ZaokruziButton 
                        answerText={answr.answer} 
                        isAnswered={answered} 
                        answerClickHandler={answerClickHandler}
                        isRightAnswer={answr.isCorrect}
                    />)
                })}
            
            </Box>

        </Box>
    )

}