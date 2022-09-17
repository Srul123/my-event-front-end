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
import {useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import {NavLink} from "react-router-dom";
import {FormControl, Tooltip} from "@mui/material";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import {useSelector, useDispatch} from "react-redux";
import {StateSelectors} from "../../../../redux-modules/selectores/stateSelectores";
import Button from "@mui/material/Button";
import "./AppBarDesktopLoggedIn.scss";
import {logoutUser} from "../../../../redux-modules/actions/appActions";
import {useTranslation} from "react-i18next";
import {optionRoutes} from "../../../../views/AppViews";


export default function AppBarDesktopLoggedIn() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const application = useSelector(StateSelectors.application);
    const drawerWidth = 85;

    return (
        <Box id={"AppBarLoginDesktop"} sx={{display: 'flex'}}>
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
                            <LogoutIcon/>
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                id={"AppBarLoginDesktopDrawer"}
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                }}
                anchor={application.local.side}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {optionRoutes.map((option, index) => {
                                return (
                                    <NavLink
                                        to={option.route}
                                        className={(navData) => navData.isActive ? "active" : ""}
                                        key={index}
                                    >
                                        {
                                            index === optionRoutes.length - 1 &&
                                            <Divider/>
                                        }
                                        <ListItem button key={index}>
                                            <Tooltip title={`${t(option.title)}`}>
                                                <ListItemIcon className={"icon"}>{option.icon}</ListItemIcon>
                                            </Tooltip>
                                        </ListItem>
                                    </NavLink>
                                )
                            }
                        )}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}
