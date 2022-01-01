import React, {useState} from 'react';
import {Avatar, Button, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import AlertIndicator, {AlertPopup} from "../components/layouts/alert-indicators/AlertIndicator";
import {routes} from "./_app-views";
import LockIcon from '@mui/icons-material/Lock';
import colors from "../styles/colors.module.scss";

const Registration: React.FC = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });


    const riseSuccessAlert = () => {
        setAlertPopup({
            ...alertPopup,
            open: true,
            vertical: "top",
            horizontal: "center",
            severityInfo: "success",
            messageInfo: "Your registration is complete, please login to your account"
        });
    };

    const riseExceptionAlert = (message: string) => {
        setAlertPopup({
            ...alertPopup,
            open: true,
            vertical: "top",
            horizontal: "center",
            severityInfo: "error",
            messageInfo: message ? message : "Please insert valid field!",
        });
    };

    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

    }

    const theme = createTheme({
        direction: 'rtl', // Both here and <body dir="rtl">
    });

    return (
        <>
            <div style={{position: "relative", top: "10vh"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Avatar>
                        <LockIcon/>
                    </Avatar>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginBottom: "1vh"}}>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            autoComplete="fname"
                            value={firstName}
                            name="firstName"
                            variant="standard"
                            fullWidth
                            id="firstName"
                            placeholder="First Name"
                            autoFocus
                            onChange={(event) => {
                                setFirstName(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            variant="standard"
                            value={lastName}
                            fullWidth
                            id="lastName"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            required
                            value={email}
                            fullWidth
                            id="email"
                            placeholder="Email Address"
                            type="email"
                            name="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            required
                            value={password}
                            fullWidth
                            name="password"
                            placeholder="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event: any) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>
                <Button
                    style={{marginTop: "2vh"}}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event: any) => {
                        handleSubmit(event);
                    }}
                >
                    Sign Up
                </Button>
                <Grid item style={{marginTop: "1vh"}}>
                    <Link to={routes.login}
                          style={{textDecoration:"none", color: colors.textSecondary}}
                    >
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </div>
            <AlertIndicator
                alertPopup={alertPopup}
                closeAlert={closeAlert}
            />
        </>
    );
};

export default Registration;
