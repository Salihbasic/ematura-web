import { TextField } from "@mui/material";
import React from "react";
import { AnsweredField } from "./DopuniAnswers";

export default function DopuniAnswer(props: { label: string; 
                                              handleFilling: (label: string, value: string) => void; 
                                              answered: AnsweredField;
                                            }) {

    const label = props.label;

    return (

        <TextField variant="outlined" 
                   label={label}
                   InputProps={{
                    readOnly: Object.keys(props.answered).length !== 0
                   }}
                   color={Object.keys(props.answered).includes(label) ? (props.answered[label] ? "success" : "error") : "primary"}
                   onChange={(event) => { props.handleFilling(label, event.target.value) }} />

    )

}