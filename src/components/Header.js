import { MenuOpen } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";

class Header extends React.Component {

    render() {

        return (
            <AppBar position="static">

                <Toolbar>

                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuOpen />
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                    >
                        eMatura
                    </Typography>

                    <Button variant="contained" color="primary">O stranici</Button>

                </Toolbar>

            </AppBar>
        )

    }

}

export default Header;
