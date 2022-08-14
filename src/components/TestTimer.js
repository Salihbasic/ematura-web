import { Typography } from "@mui/material";
import { useEffect, useState } from "react"

export default function TestTimer(props) {

    const test = props.test;

    /*
        We are tracking time in milliseconds
    */
    const [time, setTime] = useState(0);
    useEffect(() => {

        let tick = setInterval(() => {
            setTime(current => current + 1000)
        }, 1000)

        return (() => clearInterval(tick))

    }, [time]);

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

const getTime = (mil) => {

    const seconds = Math.floor((mil / 1000) % 60);
    const minutes = Math.floor((mil / 1000 / 60) % 60);
    const hours = Math.floor((mil / 1000 / 60 / 60) % 24);

    return [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0")
    ].join(":")

}