import React from 'react';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {routes} from "./AppViews";
import colors from "../styles/colors.module.scss";
import {useTranslation} from "react-i18next";

const NotFound_404 = () => {
    const {t} = useTranslation();

    return (
        <div>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                {t('page_404.not_found')}
            </Typography>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                <Link to={routes.home} style={{color: colors.textBlack}}>
                    {t('page_404.goto_home')}
                </Link>
            </Typography>
        </div>
    );
};

export default NotFound_404;
