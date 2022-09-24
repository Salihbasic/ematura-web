import React, { useEffect, useState } from "react";
import { ButtonAnswer as ButtonAnswerType, Question, Test } from "../../api/ApiTypes";
import { QuestionActionType, QuestionStats } from "../../hooks/StatsHook";
import ButtonAnswer from "./ButtonAnswer";

import "../stylesheets/Question.css";

export default function ButtonAnswers(props: { test: Test; 
                                               question: Question;
                                               answers: ButtonAnswerType[]; 
                                               finishSignal: boolean;
                                               questionStats: QuestionStats;
                                               updateQuestionStats: (answered: QuestionActionType) => void;
                                               addIncorrectAnswer: (answer: Question) => void; }) {

    const [selected, setSelected] = useState<number[]>([]);
    const [answered, setAnswered] = useState(false);

    /*
        Sums up points once the Finish button is clicked
    */
    useEffect(() => {

        if (props.finishSignal) {
            
            selected.forEach(s => {

                const correct = props.answers[s].isCorrect ? "correct" : "incorrect";

                props.updateQuestionStats(correct);
                
                if (correct === "incorrect") {
                    props.addIncorrectAnswer(props.question);
                }

            })

            setAnswered(true);

        }
        
        /* 
           I "know" what I am doing. 
           Jokes aside, it's safe to ignore the warning here. 
        */

        // eslint-disable-next-line
    }, [props.finishSignal]);

    useEffect(() => {

        setSelected([]);
        setAnswered(false);
        props.updateQuestionStats("reset");

    // eslint-disable-next-line
    }, [props.test]);

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

                <ButtonAnswer key={"button-".concat(idx.toString())} index={idx} 
                              aText={answr.answer} 
                              isSelected={selected.includes(idx)} 
                              handleClick={handleClick}
                              answered={answered}
                              isCorrect={answr.isCorrect} />

            ))}
            
        </div>

    );

}