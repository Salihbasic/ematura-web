import { Box, Typography, useTheme } from "@mui/material";

export default function Content(props) {

    const theme = useTheme();

    const dWidth = parseInt(props.drawerWidth)

    const open = props.drawerOpen;

    return (
        <Box 
            sx={{
            
                alignItems: 'center',

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

            <Typography variant="h1">Content test</Typography>

        </Box>
    )

}