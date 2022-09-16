import { TextField } from "@mui/material";
import React from "react";

export default function DopuniAnswer(props: { label: string;
                                              addFilledField: (label: string) => void;
                                              removeFilledField: (label: string) => void; 
                                            }) {

    return (

        <TextField variant="outlined" 
                   label={props.label} 
                   onKeyDown={(event) => {

                        if (event.key === "Enter") {

                            /*
                                There is some weird React and MUI thing about event target values
                                that I really don't understand (and can't be bothered to study at
                                the moment) and their typing.

                                This code *worked* before introducing TypeScript because of some...
                                magic (???) dynamic voodoo things, so let's just leave it that way.
                            */

                            // @ts-ignore
                            const content: string = event.target.value;

                            if (!content.length) {

                                props.addFilledField(props.label)

                            } else {

                                props.removeFilledField(props.label)

                            }
                            
                        }

                   }} />

    )

}