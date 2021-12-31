import React from 'react';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {routes} from "../../../views/_app-views";
import colors from "../../../styles/colors.module.scss";
import {useTranslation} from "react-i18next";


const footerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    padding: "1vh",
    backgroundColor: colors.backgroundPrimary,
    color: colors.textWhite
}

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer style={footerStyle}>
            <Typography variant="body2" align="center">
                {`${t('footer.copyright')} © `}
                <Link color="inherit" to={routes.home} style={{color: colors.textWhite}}>
                    My-Event
                </Link>{' '}
                {2022}
            </Typography>
        </footer>
    );
}

export default Footer;

