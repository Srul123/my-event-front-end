import React from 'react';
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {routes} from "../../../views/AppViews";
import colors from "../../../styles/colors.module.scss";
import {useTranslation} from "react-i18next";
import {Container} from "@mui/material";


const footerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    padding: "1vh",
    backgroundColor: colors.backgroundPrimary,
    color: colors.textWhite,
    marginTop: "2em"
}

const Footer: React.FC = () => {
    const {t} = useTranslation();

    return (
        <footer style={footerStyle}>
            <Container maxWidth="md">
                <Typography variant="body1" align="center">
                    {`${t('footer.copyright')} © `}
                    <Link color="inherit" to={routes.home} style={{color: colors.textWhite}}>
                        My-Event
                    </Link>{' '}
                    {2022}
                </Typography>
            </Container>
        </footer>
    );
}

export default Footer;

