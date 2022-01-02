import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link} from "react-router-dom";
import {routes} from "../../../../views/_app-views";
import colors from "../../../../styles/colors.module.scss";
import {FormControl} from "@mui/material";
import ChangeLanguageSelector from "../../../change-language-selector/ChangeLanguageSelector";
import {useTranslation} from "react-i18next";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const AppBarDefault: React.FC = () => {
    const {t} = useTranslation();

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: colors.backgroundPrimary}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        <Link to={routes.home} style={{color: colors.textWhite, textDecoration: "none"}}>My Event</Link>
                    </Typography>

                    <FormControl sx={{m: 1, minWidth: 80}}>
                        <ChangeLanguageSelector/>
                    </FormControl>
                    <Button>
                        <Link to={routes.register}
                              style={{
                                  color: colors.textWhite,
                                  textDecoration: "none",
                                  display: "flex"
                              }}
                        >
                            {t('header.main.register')}
                            <AppRegistrationIcon style={{color: colors.textWhite}}/>
                        </Link>
                    </Button>
                    <Button>
                        <Link to={routes.login}
                              style={{
                                  display: "flex",
                                  color: colors.textWhite,
                                  textDecoration: "none"
                              }}>
                            {t('header.main.login')}
                            <LockOpenIcon style={{color: colors.textWhite}}/>
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppBarDefault;
