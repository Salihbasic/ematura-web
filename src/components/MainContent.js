import { Box, useTheme } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Test from "./test/Test";
import Welcome from "./Welcome";

export default function MainContent(props) {

    const theme = useTheme();
    const drawerWidth = props.drawerWidth;
    const drawerOpen = props.drawerOpen;

    const test = props.test;

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

            <Routes>

                <Route path="/">
                    <Route index element={ <Welcome /> } />
                </Route>
                
                <Route path="tests">
                    <Route path=":currentTest" element={ <Test test={test} /> } />
                </Route>

                <Route path="*" element={
                    <div className="no-path">
                        <h1>
                            More bit stranice bidne, more bit stranice ne bidne.
                        </h1>
                    </div>
                }>
                </Route>

            </Routes>

        </Box>
    )

}