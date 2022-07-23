import { MenuOpen } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, useTheme } from "@mui/material";
import React from "react";

export default function Header() {

    const theme = useTheme();

    const drawerWidth = 240;

    const [open, setOpen] = React.useState(false);
    const handleMenuButton = () => setOpen(!open);

    return (
        <AppBar 
            position="static"
            sx={{
                
                    transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && {
                        width: `calc(100% - ${drawerWidth}px)`,
                        marginLeft: `${drawerWidth}px`,
                        transition: theme.transitions.create(['margin', 'width'], {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    })
                }}
        >

            <Toolbar>

                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuButton}
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
            <Drawer
                anchor="left"
                open={open}
                variant="persistent"
            >

            </Drawer>

        </AppBar>
    )

}
