import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "./components/Header";

export default function App() {

    const theme = createTheme({
        
    });

    const [open, setOpen] = useState(false);
    const handleDrawerButton = () => setOpen(!open);

    return (
        <ThemeProvider theme={theme}>
            <Header drawerWidth="240" drawerButtonHandler={handleDrawerButton} drawerOpen={open} />
        </ThemeProvider>

    )

}
