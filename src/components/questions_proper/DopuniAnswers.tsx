import React, { useRef, useState } from "react";
import { DopuniAnswer as DopuniAnswerType } from "../../api/ApiTypes";
import DopuniAnswer from "./DopuniAnswer";

export default function DopuniAnswers(props: { answers: DopuniAnswerType }) {

    const [filledFields, setFilledFields] = useState<FilledAnswers>({});

    /*
        This was honestly the biggest pain to solve in this whole project
        because the problem seemed ridiculous and illogical.

        It turns out, and it took me a while to figure this out, after
        eliminating dozens of other possibilities, that the event handler
        (in DopuniAnswer) only gets the previous snapshot of data, not
        the latest one after the update, which means that the state would
        always lag one letter behind the actual input.

        After a while of browsing, all thanks belong to Allah (s.w.t), I
        stumbled upon this broken-english blog post with a similar enough
        solution: https://file-translate.com/en/blog/react-state-in-event
    */
    const filledFieldsRef = useRef(filledFields);

    const handleFilling = (label: string, value: string) => {

        setFilledFields(Object.assign(filledFieldsRef.current, {[label]: value}));

    }

    return (

        <div className="question-answers">
        
            {Object.keys(props.answers).map((label, idx) => (

                <DopuniAnswer key={"dopuni-".concat(idx.toString())} label={label} handleFilling={handleFilling} />

            ))}
    
        </div>

    )

}

export interface FilledAnswers {

    [label: string]: string

}