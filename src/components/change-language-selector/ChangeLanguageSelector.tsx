import React from 'react';
import {IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import colors from "../../styles/colors.module.scss";
import "flag-icon-css/css/flag-icons.min.css";
import cookies from "js-cookie";
import {defaultDirection, defaultLanguage, Local, languages} from "../../interfaces/Locales";
import {useDispatch} from "react-redux";
import {setLocalLanguage} from "../../redux-modules/actions/appActions";

const ChangeLanguageSelector: React.FC = () => {
    const dispatch = useDispatch();
    const currentLanguageCode = cookies.get('i18next') || defaultLanguage;
    const currentLanguage: Local = languages.find(l => l.code === currentLanguageCode) || languages[0];
    const {t} = useTranslation();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleChangeLanguage = (langCode: string | undefined) => {
        i18next.changeLanguage(langCode);
        setAnchorElUser(null);
        const currentLanguage: Local = languages.find(l => l.code === langCode) || languages[0];
        dispatch(setLocalLanguage(currentLanguage));
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        document.body.dir = (String)(currentLanguage.dir) || defaultDirection;
        document.title = t('app_title');
        if (currentLanguage.code != null) {
            document.documentElement.lang = currentLanguage.code;
        }
    }, [currentLanguage, t])

    return (
        <>
            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                <Tooltip title={`${t('header.select_language')}`}>
                    <LanguageIcon style={{color: colors.textWhite}}/>
                </Tooltip>
            </IconButton>
            <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {languages.map((lang) => (
                    <MenuItem key={lang.code}
                              onClick={() => handleChangeLanguage(lang.code)}
                              disabled={lang.code === currentLanguageCode}
                    >
                        <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                            <Typography textAlign="center">{lang.name}</Typography>
                            <span style={{margin: "0 1vw"}}
                                  className={`flag-icon flag-icon-${lang.countryCode}`}> </span>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ChangeLanguageSelector;
