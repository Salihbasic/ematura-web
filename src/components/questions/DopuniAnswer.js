import { TextField } from "@mui/material";

export default function DopuniAnswer(props) {

    const label = props.label;

    const correctAnswers = props.correctAnswers;
    const answerHandler = props.answerHandler;

    const specificValues = props.specificValues;
    const handleSpecificValues = props.handleSpecificValues;

    /* 
        In case it doesn't exist (i.e not recorded) it'll be undefined
        which is falsy, as such it's used for tests in the code below
    */
    const specificVal = specificValues.find(elem => elem.label === label);

    return (

        <TextField variant="outlined"
                label={label}
                InputProps={{
                    readOnly: specificVal ? true : false
                }}
                color={
                    specificVal ? (specificVal.correct ? "success" : "error") : "primary"
                }
                onKeyDown={(event) => {

                    if (event.key === 'Enter' && (specificVal ? false : true)) {

                        const correct = correctAnswers.includes(event.target.value);

                        answerHandler(correct);
                        handleSpecificValues(label, correct);
                        
                    }

                }} />


    )

}