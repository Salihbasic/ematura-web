import { Box, Typography, useTheme } from "@mui/material";
import { getQuestionsByName } from "../api/QuestionsFetcher.mjs";
import Question from "./Question";

/*
    Basic implementation of the Fisher-Yates shuffle algorithm.

    We use it here to shuffle the array of question objects passed onto the 
    component as a property before rendering it, so as to ensure randomised
    order.
*/
function fyShuffle(array) {

    var m = array.length;
    var i;

    while (m) {

        i = Math.floor(Math.random() * m--);

        [array[m], array[i]] = [array[i], array[m]]

    }

    return array;

}

export default function Content(props) {

    const theme = useTheme();

    const dWidth = parseInt(props.drawerWidth)

    const open = props.drawerOpen;

    const bosanskiQuestions = getQuestionsByName("bosanski");
    const firstText = bosanskiQuestions[0].question;
    
    const firstRightAnswers = bosanskiQuestions[0].rightAnswers.map(answr => ({
        answer: answr,
        isCorrect: true
    }));

    const firstWrongAnswers = bosanskiQuestions[0].wrongAnswers.map(answr => ({
        answer: answr,
        isCorrect: false
    }));

    const firstAnswers = [...firstRightAnswers, ...firstWrongAnswers];
    fyShuffle(firstAnswers);

    return (
        <Box 
            sx={{
            
                alignItems: 'center',
                justifyContent: 'center',

                transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
                }),
                ...(open && {
                    width: `calc(100% - ${dWidth}px)`,
                    marginLeft: `${dWidth}px`,
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                })

            }}
        >

            <Typography variant="h1">Content test</Typography>
            <Question questionText={firstText} questionAnswers={firstAnswers} />

        </Box>
    )

}