import React from "react";
import {Link} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";


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
                            color="textPrimary"
                            gutterBottom
                        >
                            My-Event
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            Build your event any time any where
                        </Typography>
                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    <Link
                                        to="/signup"
                                        style={{color: "white", textDecoration: "none"}}
                                    >
                                        Click to sign up
                                    </Link>
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" color="primary">
                                    <Link to="/signin" style={{textDecoration: "none"}}>
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

