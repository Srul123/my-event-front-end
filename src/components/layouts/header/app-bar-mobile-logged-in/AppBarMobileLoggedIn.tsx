import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import {Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import LogoutIcon from '@mui/icons-material/Logout';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AppBarMobileLoggedIn() {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex"}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer('top', true)}
                            style={{marginLeft: "0.5em", marginRight: "0.5em"}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            My Event
                        </Typography>
                    </div>
                    <div style={{display: "flex"}}>
                        <ChangeLanguageSelector/>
                        <Button color="inherit">
                            Logout
                            <LogoutIcon />
                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
            <div>
                <TemporaryDrawer
                    openDrawer={openDrawer}
                    toggleDrawer={toggleDrawer}
                />
            </div>
        </div>
    );
}


interface Props {
    openDrawer: any;
    toggleDrawer: any;
}

const TemporaryDrawer: React.FC<Props> = ({openDrawer, toggleDrawer}) => {

    const list = (anchor: Anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            style={{direction: "initial"}}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer anchor={'top'} open={openDrawer} onClose={toggleDrawer('top', false)}>
                    {list('top')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
