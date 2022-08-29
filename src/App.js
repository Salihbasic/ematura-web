import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getQuestionsByName } from "./api/QuestionsFetcher.mjs";
import { shuffleTest } from "./api/Shuffler.mjs";
import Header from "./components/Header";
import MainContent from "./components/MainContent.js";

export default function App() {

    /*
        If you are reading this code, whether you are me from the future
        or someone else, please take warning that I've already started to lose
        track of how things work, and I am merely two months into the project.

        In the documentation there should be a UML diagram (if I've bothered to make one)
        "explaining" the overall architecture of the app and its inner workings.
    */

    /*
        I may or may not have made quite a few obviously idiotic
        design decisions, and by design I mean both the actual website design
        and the app architecture.

        This thing ought to be burned to the ground and recreated by someone
        smarter and more competent than me.
    */

    /*
        I've also learned that using JavaScript for anything even slightly
        non-trivial is a huge mistake. Without static typing, it becomes an
        unmaintainable labyrinth of mysterious functions, constants and runtime
        error jumpscares. Go redo it in TypeScript or something.
    */

    const theme = createTheme({});
    const location = useLocation();
    
    const testList = {
        "bosanski": {name: "Bosanski", questions: getQuestionsByName("bosanski")}
    };

    const [open, setOpen] = useState(false);
    const handleDrawerButton = () => setOpen(!open);

    const [test, setTest] = useState(null);
    const handleTest = (name) => {

        if (name === "reset") {

            setTest(test => {

                    if (test.name.endsWith("-wrong")) {
                        
                        return shuffleTest(testList[location.pathname.substring("/tests/".length)])
                        
                    } else {
                        return shuffleTest(structuredClone(test))
                    }
                
                }

            );

        } else {

            setTest(shuffleTest(testList[name]))

        }

    }

    const addNewTest = (test) => {
        setTest(test);
    }

    return (
        
        <ThemeProvider theme={theme}>
            
            <Header drawerWidth={240} 
                    drawerButtonHandler={handleDrawerButton} 
                    drawerOpen={open}

                    testList={testList}
                    handleTest={handleTest} />

            <MainContent drawerWidth={240}
                         drawerOpen={open} 
                         test={test} 
                         addNewTest={addNewTest}   
                         />

        </ThemeProvider>

    )

}
