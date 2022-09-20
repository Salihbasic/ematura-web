import { Button } from "@mui/material";
import React from "react";

export default function ButtonAnswer(props: { index: number; 
                                              aText: string; 
                                              isSelected: boolean
                                              handleClick: (idx: number, action: "deselect" | "select") => void;
                                              answered: boolean;
                                              isCorrect: boolean; }) {
    return (

        <Button variant={props.isSelected ? "contained" : "outlined"}
                color={props.answered ? (props.isCorrect ? "success" : "error") : "primary"} 
                onClick={() => {
                    if (!props.answered) {
                        props.handleClick(props.index, props.isSelected ? "deselect" : "select")
                    }
                }}>
            {props.aText}
        </Button>

    )

}