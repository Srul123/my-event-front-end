import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SettingsIcon from "@mui/icons-material/Settings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {NavLink} from "react-router-dom";
import "./AppBarDesktopLoggedIn.scss";
import {FormControl, Tooltip} from "@mui/material";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import {useSelector} from "react-redux";
import {LocalesState} from "../../../../redux-modules/selectores/stateSelectores";
import {LanguageInterface} from "../../../../types/Locales";

const optionRoutes = [
    {
        title: "Overall Status",
        icon: <PlaylistAddCheckIcon/>,
        route: "/myprofile",
    },
    {
        title: "My Event Details",
        icon: <EventNoteIcon/>,
        route: "/event-details",
    },
    {
        title: "Inviters Management",
        icon: <PeopleOutlineIcon/>,
        route: "invite-management",
    },
    {
        title: "RSVP",
        icon: <MarkunreadMailboxIcon/>,
        route: "rsvp",
    },
    {
        title: "Seating Arrangement",
        icon: <BorderVerticalIcon/>,
        route: "seating-arrangement",
    },
    {
        title: "Expenses summary",
        icon: <AttachMoneyIcon/>,
        route: "expenses-summary",
    },
];

const drawerWidth = 85;

export default function AppBarDesktopLoggedIn() {
    const currentLanguageDirection: LanguageInterface = useSelector(LocalesState.getCurrentLanguage);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        My Event
                    </Typography>
                    <FormControl sx={{m: 1, minWidth: 80}}>
                        <ChangeLanguageSelector/>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
                anchor={currentLanguageDirection.side}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {optionRoutes.map((option, index) => (
                            <NavLink
                                to={option.route}
                                className={(navData) => navData.isActive ? "active" : ""}
                                key={index}
                            >
                                <ListItem button key={index}>
                                    <Tooltip title={option.title}>
                                        <ListItemIcon className={"icon"}>{option.icon}</ListItemIcon>
                                    </Tooltip>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        {[
                            {
                                title: "Account Settings",
                                icon: <SettingsIcon/>,
                            },
                        ].map((option, index) => (
                            <ListItem button key={index}>
                                <Tooltip title={option.title}>
                                    <ListItemIcon>{option.icon}</ListItemIcon>
                                </Tooltip>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
