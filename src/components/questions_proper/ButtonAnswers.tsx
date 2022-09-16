import React, { useState } from "react";
import { ButtonAnswer as ButtonAnswerType } from "../../api/ApiTypes";
import ButtonAnswer from "./ButtonAnswer";

import "../stylesheets/Question.css";

export default function ButtonAnswers(props: { answers: ButtonAnswerType[] }) {

    const [selected, setSelected] = useState<number[]>([]);

    const selectAnswer = (aIdx: number) => {
        setSelected(prev => [...prev, aIdx])
    }

    /*
        Interesting StackExchange thread on whether the correct usage
        would be 'deselect' or 'unselect': 
        
        https://english.stackexchange.com/questions/18465/unselect-or-deselect
    */
    const deselectAnswer = (aIdx: number) => {
        setSelected(prev => prev.filter(idx => idx !== aIdx))
    }

    const numPossibleSelections = props.answers.filter(a => a.isCorrect).length;

    const handleClick = (idx: number, action: "select" | "deselect") => {

        if (action === "deselect" && !selected.includes(idx)) {
            
            console.log("Panic! Tried to deselect an unselected answer!")
            return;

        }

        if (numPossibleSelections === 1) {

            if (selected.length === 0) {
                
                if (action === "select") {
                    
                    selectAnswer(idx)
                
                }

            }

            if (selected.length === 1) {

                if (action === "select") {

                    if (!selected.includes(idx)) {

                        setSelected([idx])

                    }

                } else {

                    deselectAnswer(idx)

                }

            } 

        } else {

            if (selected.length < numPossibleSelections) {

                action === "select" ? selectAnswer(idx) : deselectAnswer(idx)

            } else {

                if (action === "deselect") {

                    deselectAnswer(idx)

                }

            }

        }


    }

    return (

        <div className="question-answers">

            {props.answers.map((answr, idx) => (

                <ButtonAnswer index={idx} 
                              aText={answr.answer} 
                              isSelected={selected.includes(idx)} 
                              handleClick={handleClick} />

            ))}
            
        </div>

    );

}