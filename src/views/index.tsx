import React from "react";
import {Link} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {routes} from "./_app-views";
import colors from "../styles/colors.module.scss";


export const Home: React.FC = () => {
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
                            My-Event
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            style={{color: colors.textSecondary}}
                            paragraph
                        >
                            Build your event any time any where
                        </Typography>
                        <div style={{display:"flex",justifyContent:"space-evenly"}}>
                            <Grid item>
                                <Button variant="contained" style={{backgroundColor: colors.backgroundPrimary}}>
                                    <Link
                                        to={routes.signup}
                                        style={{color: colors.textWhite, textDecoration: "none"}}
                                    >
                                        Click to sign up
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" style={{color: colors.textWhite}}>
                                    <Link to={routes.signup} style={{textDecoration: "none"}}>
                                        Click to sign in
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

