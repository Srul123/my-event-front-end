import React from "react";
import {Link} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {routes} from "./AppViews";
import colors from "../styles/colors.module.scss";
import {useTranslation} from "react-i18next";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export const Home: React.FC = () => {
    const {t} = useTranslation();

    return (
        <React.Fragment>
            <CssBaseline/>
            <main>
                <div>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            gutterBottom
                            style={{color: colors.textBlack}}
                        >
                            {t('home.title_prime')}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            style={{color: colors.textSecondary}}
                            paragraph
                        >
                            {t('home.title_secondary')}
                        </Typography>
                        <div style={{display: "flex", justifyContent: "space-evenly"}}>
                            <Grid item>
                                <Button variant="contained" style={{backgroundColor: colors.backgroundPrimary}}>
                                    <Link
                                        to={routes.registration}
                                        style={{color: colors.textWhite,
                                            textDecoration: "none",
                                            display: "flex"
                                        }}
                                    >
                                        {t('home.register')}
                                        <span><AppRegistrationIcon/></span>
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined">
                                    <Link to={routes.login}
                                          style={{color: colors.textBlack,
                                              display: "flex",
                                              textDecoration: "none"}}
                                    >
                                        {t('home.login')} <span><LockOpenIcon/></span>
                                    </Link>
                                </Button>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Home;

