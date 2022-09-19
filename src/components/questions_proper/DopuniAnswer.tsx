import { TextField } from "@mui/material";
import React from "react";

export default function DopuniAnswer(props: { label: string; handleFilling: (label: string, value: string) => void; }) {

    const label = props.label;

    return (

        <TextField variant="outlined" 
                   label={label}
                   onChange={(event) => { props.handleFilling(label, event.target.value) }} />

    )

}