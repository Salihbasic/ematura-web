import { createTheme, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTest, useTestList } from "./api/QuestionsFetcher";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useTestSettings } from "./Settings";

export default function App() {

    const theme = createTheme({});

    const [displayedContent, setDisplayedContent] = useState<ContentType>("welcome");
    const homeButtonHandler = () => setDisplayedContent("welcome");
    const settingsButtonHandler = () => setDisplayedContent("settings")

    const [test, changeTest, testError] = useTest();
    const [testList, testListError] = useTestList();
    const [testSettings, updateSettings] = useTestSettings();

    const [open, setOpen] = useState(false);
    const handleDrawerButton = () => setOpen(!open);

    useEffect(() => {

        /*
            In case an error has occurred while 
            loading the test.
        */
        if (testError) { 
            setDisplayedContent("test-error");
        }

        /*
            Test has successfully loaded.
        */
        if (test && !testError) {
            setDisplayedContent("test");
        }

    }, [test, testError]);

    if (testList == null) {

        return (

            <div className="total-utter-error">

                <h1>
                    Nije moguće učitati listu testova!
                </h1>

                <p>
                    Error: {testListError?.message}
                </p>

                <p>
                    Ako vidite ovu stranicu, molimo vas da kontaktirate: <b>mahir.salihbasic@protonmail.com</b>
                </p>

            </div>

        )

    }

    return (
        
        <ThemeProvider theme={theme}>
            
            <Header drawerWidth={240} 
                    drawerButtonHandler={handleDrawerButton} 
                    drawerOpen={open}
                    homeButtonHandler={homeButtonHandler}
                    testList={testList}
                    changeTest={changeTest}
                    settingsButtonHandler={settingsButtonHandler} />

                
            <MainContent drawerWidth={240}
                         drawerOpen={open}
                         content={displayedContent} 
                         test={test} 
                         changeTest={changeTest}
                         settingsObject={testSettings}
                         updateSettings={updateSettings} />

        </ThemeProvider>

    )

}

export type ContentType = "welcome" | "settings" | "test" | "test-error";