import { NavigateBeforeOutlined, NavigateNextOutlined } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";

export function AnswerButton(props) {

    const answerText = props.answerText;

    const isAnswered = props.isAnswered;
    const clickHandler = props.answerClickHandler;
    const isRight = props.isRightAnswer;

    return (
        
        <Button
            variant={isAnswered ? "contained" : "outlined"}
            onClick={clickHandler}
            color={
                isAnswered ? 
                    (isRight ? "success" : "error") : "primary"
            }
        >
            {answerText}
        </Button>
    )

}

export function NextQuestionButton(props) {

    const clickHandler = props.clickHandler;

    return (

        <IconButton
            aria-label="next-question-btn"
            onClick={clickHandler}
        >
            <NavigateNextOutlined fontSize="medium" />
        </IconButton>
        
    )

}

export function PreviousQuestionButton(props) {

    const clickHandler = props.clickHandler;

    return (

        <IconButton
            aria-label="previous-question-btn"
            onClick={clickHandler}
        >
            <NavigateBeforeOutlined fontSize="medium" />
        </IconButton>
        
    )

}