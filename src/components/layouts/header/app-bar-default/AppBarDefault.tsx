import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const AppBarDefault: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Event
                    </Typography>
                    <Button color="inherit">Signup <LockOpenIcon /></Button>
                    <Button color="inherit">Login <LoginIcon /></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppBarDefault;
