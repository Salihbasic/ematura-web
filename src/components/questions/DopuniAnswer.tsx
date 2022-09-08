import { TextField } from "@mui/material";
import React from "react";
import { SpecificValue } from "./Question";

export default function DopuniAnswer(props: { label: string; 
                                              correctAnswers: string[]; 
                                              answerHandler: (corr: boolean) => void; 
                                              specificValues: SpecificValue[]; 
                                              handleSpecificValues: (label: string, corr: boolean) => void; 
                                            }) {

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

                        /*
                            There is some weird React and MUI thing about event target values
                            that I really don't understand (and can't be bothered to study at
                            the moment) and its typing.

                            This code *worked* before introducing TypeScript because of some...
                            magic (???) dynamic voodoo things, so let's just leave it that way.
                        */

                        // @ts-ignore
                        const correct = correctAnswers.includes(event.target.value);

                        answerHandler(correct);
                        handleSpecificValues(label, correct);
                        
                    }

                }} />


    )

}