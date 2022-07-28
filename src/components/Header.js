import { MenuOpen } from "@mui/icons-material";
import { AppBar, 
         Box, 
         Toolbar, 
         IconButton, 
         Typography, 
         Button, 
         Drawer, 
         useTheme, 
         Divider, 
         List, 
         ListItem, 
         ListItemButton, 
         ListItemText } from "@mui/material";
import React from "react";


function DrawerHeader() {

    return (
        <Box
            sx={{

                    display: 'flex',
                    alignItems: 'center',
                    paddingBottom: '50px'
                }}
        >
            <Typography
                variant="h6"
                sx={{ flexGrow: 1, textAlign: 'center' }}
            >
                Testovi
            </Typography>
        </Box>
    )

}


export default function Header(props) {

    const theme = useTheme();

    const dWidth = parseInt(props.drawerWidth)
    const handleMenuButton = props.drawerButtonHandler;
    const open = props.drawerOpen;

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

                    {['Test 2012', 'Test 2013', 'Test 2014', 'Test 2015'].map((text) => (

                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>

                    ))}

                </List>

            </Drawer>

        </AppBar>
    )

}
