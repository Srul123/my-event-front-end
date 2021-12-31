import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link} from "react-router-dom";
import {routes} from "../../../../views/_app-views";
import colors from "../../../../styles/colors.module.scss";


const AppBarDefault: React.FC = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: colors.backgroundPrimary}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to={routes.home} style={{color: colors.textWhite, textDecoration: "none"}}>My Event</Link>
                    </Typography>
                    <Button>
                        <Link to={routes.signup} style={{color: colors.textWhite, textDecoration: "none"}}>Signup</Link>
                        <LockOpenIcon style={{color: colors.textWhite}}/>
                    </Button>
                    <Button>
                        <Link to={routes.login} style={{color: colors.textWhite, textDecoration: "none"}}>Login</Link>
                        <LoginIcon style={{color: colors.textWhite}}/>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppBarDefault;
