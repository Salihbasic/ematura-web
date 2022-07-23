import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import Header from "./components/Header";

class App extends React.Component {

    theme = createTheme({
        
    })

    render() {

        return (
            <ThemeProvider theme={this.theme}>
                <Header />
            </ThemeProvider>

        )

    }

}

export default App;
