import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {FormControl, Tooltip, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import LogoutIcon from '@mui/icons-material/Logout';
import { MuiThemeSupportedLocales, Side} from "../../../../interfaces/Locales";
import TemporaryDrawer from "./temporary-drawer/TemporaryDrawer";
import {useTranslation} from "react-i18next";
import {StateSelectors} from "../../../../redux-modules/selectores/stateSelectores";
import {logoutUser, updateIsAppLoading} from "../../../../redux-modules/actions/appActions";
import {useNavigate} from "react-router-dom";

interface Props {
    setMuiThemeLocal:  React.Dispatch<React.SetStateAction<MuiThemeSupportedLocales>>
}

const AppBarMobileLoggedIn: React.FC<Props> = ({setMuiThemeLocal}) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const application = useSelector(StateSelectors.application);
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (anchor: Side, open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const handleLogout = async () => {
        dispatch(updateIsAppLoading(true));
        try {
            await dispatch(logoutUser(application.auth.token));
            navigate("/", {replace: true});
        }catch (e) {
            console.error("Can't logout user");
        } finally {
            dispatch(updateIsAppLoading(false));
        }
    };

    return (
        <div id={"AppBarMobileLoggedIn"} >
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
                    <div>
                        <div>
                            <FormControl sx={{m: 1, minWidth: 50}}>
                                <ChangeLanguageSelector setMuiThemeLocal={setMuiThemeLocal}/>
                            </FormControl>
                            <Button color="inherit" onClick={() => handleLogout()}>
                                {t('header.logout')}
                                <LogoutIcon/>
                            </Button>
                        </div>
                    </div>

                </Toolbar>
            </AppBar>
            <div>
                <TemporaryDrawer
                    openDrawer={openDrawer}
                    toggleDrawer={toggleDrawer}
                    local={application.local}
                />
            </div>
        </div>
    );
}



export default  AppBarMobileLoggedIn;