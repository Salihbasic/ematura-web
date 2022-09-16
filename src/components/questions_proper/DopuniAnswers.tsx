import React, { useState } from "react";
import { DopuniAnswer as DopuniAnswerType } from "../../api/ApiTypes";
import DopuniAnswer from "./DopuniAnswer";

export default function DopuniAnswers(props: { answers: DopuniAnswerType }) {

    const [filledFields, setFilledFields] = useState<[string, string][]>([["", ""]])

    const handleFilling = (label: string, value: string) => {

        if (!value.length) {

            

        } else {

            

        }

    }

    return (

        <div className="question-answers">

            {Object.entries(props.answers).map(([label, _]) => (

                <DopuniAnswer label={label} 
                              addFilledField={addFilledField} 
                              removeFilledField={removeFilledField} />

            ))}

        </div>

    )

}