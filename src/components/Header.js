import { Home, MenuOpen } from "@mui/icons-material";
import { AppBar, 
         Stack,
         Toolbar, 
         IconButton, 
         Typography, 
         Drawer, 
         useTheme, 
         Divider, 
         List, 
         ListItem, 
         ListItemButton, 
         ListItemText } from "@mui/material";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";


function DrawerHeader() {

    return (

        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{ 
                paddingTop: '16px',
                paddingBottom: '16px' 
            }}
        >
            <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: 'center' }}
            >
                Testovi
            </Typography>

        </Stack>

    )

}


export default function Header(props) {

    const theme = useTheme();
    const location = useLocation();

    const dWidth = props.drawerWidth;
    const handleMenuButton = props.drawerButtonHandler;
    const open = props.drawerOpen;
    
    const testList = props.testList;
    const handleTest = props.handleTest;

    return (
        <AppBar 
            position="static"
            sx={{
                
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

            <Toolbar>

                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="menu-button"
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

                <IconButton
                    component={RouterLink}
                    to={`/`}
                    size="large"
                    color="inherit"
                    aria-label="home-button"
                    sx={{ ml: 2 }}
                >
                    <Home />
                </IconButton>

            </Toolbar>
            <Drawer
                anchor="left"
                open={open}
                variant="persistent"
                sx={{
                    width: dWidth,
                    '& .MuiDrawer-paper': {
                        width: dWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <DrawerHeader />

                <Divider />

                <List>


                    {Object.keys(testList).map(key => (

                        <ListItem key={key}>

                            <ListItemButton component={RouterLink}
                                            to={`tests/${key}`}
                                            onClick={() => {

                                                /*
                                                    Resets the counter if the same test is clicked.
                                                    Hacky workaround until I find a better solution.
                                                */
                                                if (location.pathname === `/tests/${key}`) {
                                                    handleTest("reset"); /* Will run a structuredCopy on the current test object */
                                                } else {
                                                    handleTest(key);
                                                }


                                            }}
                                >

                                <ListItemText primary={capitalise(key)} />

                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

            </Drawer>

        </AppBar>
    )

}

/*
    Helper functions for test name resolution
*/
const capitalise = (str) => str ? (str[0].toUpperCase() + str.slice(1)) : "";