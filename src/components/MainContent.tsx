import { Box, useTheme } from "@mui/material";
import React from "react";
import { Test as TestType } from "../api/ApiTypes";
import { ContentType } from "../App";
import { TestSettings } from "../Settings";
import SettingsPage from "./SettingsPage";
import Test from "./test/Test";
import Welcome from "./Welcome";

export default function MainContent(props: { drawerWidth: number; 
                                             drawerOpen: boolean; 
                                             content: ContentType, 
                                             test: TestType | null, 
                                             changeTest: (testName: string | TestType) => void;
                                             settingsObject: TestSettings;
                                             updateSettings: <K extends keyof TestSettings>(key: K, value: TestSettings[K]) => void; }
                                    ) {

    const theme = useTheme();

    const drawerWidth = props.drawerWidth;
    const drawerOpen = props.drawerOpen;

    const content = props.content;

    return (
        <Box
            className="main-content"
            sx={{
                transition: theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen
                }),
                ...(drawerOpen && {
                    width: `calc(100% - ${drawerWidth}px)`,
                    marginLeft: `${drawerWidth}px`,
                    transition: theme.transitions.create(['margin', 'width'], {
                                easing: theme.transitions.easing.easeOut,
                                duration: theme.transitions.duration.enteringScreen
                    })
                })
            }}
        >
            
            {content === "welcome" &&
                <Welcome />
            }

            {content === "settings" &&
                <SettingsPage settingsObject={props.settingsObject} updateSettings={props.updateSettings} />
            }
            
            {content === "test" &&
                <Test test={props.test as TestType} changeTest={props.changeTest} />    
            }

            {content === "test-error" &&
                <div className="no-path">
                    <h1>
                        More bit test bidne, more bit test ne bidne.
                    </h1>
                </div>
            }

        </Box>
    )

}