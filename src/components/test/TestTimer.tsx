import { Typography } from "@mui/material";
import React from "react";
import { useEffect, useRef, useState } from "react"
import { Test } from "../../api/ApiTypes";

export default function TestTimer(props: { test: Test; finished: boolean; }) {

    const test = props.test;
    const finished = props.finished

    /*
        We are tracking time in milliseconds
    */
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const [time, setTime] = useState(0);
    useEffect(() => {

        if (!finished) {
            startTimer();
        }

        return (() => clearTimeout(timer.current!))

    }, [finished]);

    const startTimer = () => {
        
        timer.current = setInterval(() => {
            setTime(current => current + 1000)
        }, 1000);

    }

    /* Reset time whenever test object changes */
    useEffect(() => {
        setTime(0);
    }, [test]);

    return (
        <Typography variant="h5">
            {getTime(time)}
        </Typography>
    )

}

const getTime = (mil: number) => {

    const seconds = Math.floor((mil / 1000) % 60);
    const minutes = Math.floor((mil / 1000 / 60) % 60);
    const hours = Math.floor((mil / 1000 / 60 / 60) % 24);

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ].join(":")

}