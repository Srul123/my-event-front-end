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
import { useNavigate } from "react-router-dom";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SettingsIcon from "@mui/icons-material/Settings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {FormControl, Tooltip} from "@mui/material";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import {useSelector, useDispatch} from "react-redux";
import {LocalesState} from "../../../../redux-modules/selectores/stateSelectores";
import {LanguageInterface} from "../../../../types/Locales";
import Button from "@mui/material/Button";
import "./AppBarDesktopLoggedIn.scss";
import {logoutUser} from "../../../../redux-modules/actions/userActions";
import {useTranslation} from "react-i18next";


export default function AppBarDesktopLoggedIn() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentLanguageDirection: LanguageInterface = useSelector(LocalesState.getCurrentLanguage);
    const iconSize = "large";
    const drawerWidth = 85;

    const optionRoutes = [
        {
            title: t('header.menu.overall_status'),
            icon: <PlaylistAddCheckIcon fontSize={iconSize}/>,
            route: "/myprofile",
        },
        {
            title: t('header.menu.event_details'),
            icon: <EventNoteIcon fontSize={iconSize}/>,
            route: "/event-details",
        },
        {
            title: t('header.menu.invited_management'),
            icon: <PeopleOutlineIcon fontSize={iconSize}/>,
            route: "invite-management",
        },
        {
            title: t('header.menu.rsvp'),
            icon: <MarkunreadMailboxIcon fontSize={iconSize}/>,
            route: "rsvp",
        },
        {
            title: t('header.menu.seating_arrangement'),
            icon: <BorderVerticalIcon fontSize={iconSize}/>,
            route: "seating-arrangement",
        },
        {
            title: t('header.menu.expenses_summary'),
            icon: <AttachMoneyIcon fontSize={iconSize}/>,
            route: "expenses-summary",
        },
    ];

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h6" noWrap component="div">
                        My Event
                    </Typography>
                    <div>
                        <FormControl sx={{m: 1, minWidth: 80}}>
                            <ChangeLanguageSelector/>
                        </FormControl>
                        <Button color="inherit" onClick={() => {
                            dispatch(logoutUser());
                            navigate("/", {replace: true});
                        }}>
                            {t('header.logout')}
                            <LogoutIcon />
                        </Button>
                    </div>
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
                                title: t('header.menu.account_settings'),
                                icon: <SettingsIcon fontSize={iconSize}/>,
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
