import { Button } from "@mui/material";

export default function QuestionAnswer(props) {

    const answerHandler = props.answerHandler;
    const answered = props.answered;

    const answerText = props.answerText;
    const correct = props.correct;

    return (
        <Button
            onClick={() => answerHandler(correct)}
            color={
                answered.answered ? 
                    (correct ? "success" : "error") : "primary"
            }
            variant={answered.answered ? "contained" : "outlined"}
        >
            {answerText}
        </Button>
    )

}