import React, {useState} from 'react';
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import AlertIndicator, {AlertPopup} from "../components/layouts/alert-indicators/AlertIndicator";
import {routes} from "./_app-views";
import LockIcon from '@mui/icons-material/Lock';
import colors from "../styles/colors.module.scss";
import {useTranslation} from "react-i18next";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {isValidName} from '../utils/validationFunctionsCollection';
import EventTypeSelector from "../components/event-type-selector/EventTypeSelector";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const Registration: React.FC = () => {
    const {t} = useTranslation();
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

    const handleSubmit: any = async (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let formData = {
            firstName,
            lastName,
            email,
            password
        };

        if (!await isValidName(firstName)) {
            console.log("error firstName");
            return;
        }
        if (!await isValidName(lastName)) {
            console.log("error lastname");
            return;
        } else {
            console.log("passed");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{position: "relative", top: "10vh"}}>
                <Grid style={{display: "flex", justifyContent: "center"}}>
                    <Avatar style={{fontSize: "5em"}}>
                        <AppRegistrationIcon />
                    </Avatar>
                </Grid>
                <Grid style={{display: "flex", justifyContent: "center", marginBottom: "1vh"}}>
                    <Typography component="h1" variant="h5">
                       {t('registration.register')}
                    </Typography>
                </Grid>
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
                            placeholder={`* ${t('registration.first_name')}`}
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
                            placeholder={`* ${t('registration.last_name')}`}
                            name="lastName"
                            onChange={(event) => {
                                setLastName(event.target.value);
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            required
                            value={email}
                            fullWidth
                            id="email"
                            placeholder={t('registration.email')}
                            type="email"
                            name="email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            variant="standard"
                            required
                            value={email}
                            fullWidth
                            id="phone"
                            placeholder={`Phone number`}
                            type="text"
                            name="phone"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            required
                            value={password}
                            fullWidth
                            name="password"
                            placeholder={`* ${t('registration.password')}`}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event: any) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="standard"
                            required
                            value={password}
                            fullWidth
                            name="repeat-password"
                            placeholder={`* Repeat password`}
                            type="password"
                            id="repeat-password"
                            autoComplete="current-password"
                            onChange={(event: any) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                     <EventTypeSelector />
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl fullWidth sx={{minWidth: 120}}>
                            <Tooltip title={"Click on the icon to open calendar"}>
                                <TextField
                                    style={{width:"100%"}}
                                    id="datetime-local"
                                    label="Event Date (optional)"
                                    type="datetime-local"
                                    // defaultValue="2017-05-24T10:30"
                                    defaultValue=""
                                    sx={{width: 250}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                </Grid>

                <Button
                    style={{marginTop: "2vh"}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={(event: any) => {
                        handleSubmit(event);
                    }}
                >
                    {t('registration.signup')}
                    <ExitToAppIcon style={{margin: "0 0.5vw"}}/>
                </Button>
                <Grid item style={{marginTop: "2vh"}}>
                    <Link to={routes.login}
                          style={{textDecoration: "underline", color: colors.textSecondary}}
                    >
                        {t('registration.already_registered')}
                    </Link>
                </Grid>
            </form>
            <AlertIndicator
                alertPopup={alertPopup}
                closeAlert={closeAlert}
            />
        </>
    );
};

export default Registration;
