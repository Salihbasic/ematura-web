import { Button } from "@mui/material";

export function ZaokruziButton(props) {

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