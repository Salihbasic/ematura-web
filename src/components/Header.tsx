import { Home, MenuOpen, Settings } from "@mui/icons-material";
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
         ListItemText, 
         ListItemButton} from "@mui/material";
import React from "react";

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


export default function Header(props: { drawerWidth: number; 
                                        drawerButtonHandler: () => void; 
                                        drawerOpen: boolean; 
                                        homeButtonHandler: () => void;
                                        testList: string[];
                                        changeTest: (testName: string) => void; 
                                        settingsButtonHandler: () => void; }) {

    const theme = useTheme();

    const dWidth = props.drawerWidth;
    const handleMenuButton = props.drawerButtonHandler;
    const open = props.drawerOpen;
    
    const changeTest = props.changeTest;
    const testList = props.testList;

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
                    size="large"
                    color="inherit"
                    aria-label="settings-button"
                    sx={{ ml: 2 }}
                    onClick={props.settingsButtonHandler}
                >
                    <Settings />
                </IconButton>

                <IconButton
                    size="large"
                    color="inherit"
                    aria-label="home-button"
                    sx={{ ml: 2 }}
                    onClick={props.homeButtonHandler}
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


                    {testList.map(key => (

                        <ListItem key={key}>

                            <ListItemButton onClick={() => changeTest(key)}>
                                <ListItemText primary={key} />
                            </ListItemButton>

                        </ListItem>

                    ))}

                </List>

            </Drawer>

        </AppBar>
    )

}