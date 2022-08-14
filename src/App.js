import { createTheme, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { getQuestionsByName } from "./api/QuestionsFetcher.mjs";
import { shuffleTest } from "./api/Shuffler.mjs";
import Header from "./components/Header";
import MainContent from "./components/MainContent.js";

export default function App() {

    const theme = createTheme({});
    
    const testList = {
        "bosanski": {name: "Bosanski", questions: getQuestionsByName("bosanski")}
    };

    const [open, setOpen] = useState(false);
    const handleDrawerButton = () => setOpen(!open);

    const [test, setTest] = useState(null);
    const handleTest = (name) => {

        if (name === "reset") {
            setTest(test => structuredClone(test));
        } else {
            setTest(shuffleTest(testList[name]))
        }

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
                         test={test} />

        </ThemeProvider>

    )

}
