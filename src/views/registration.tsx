import React, {useState} from 'react';
import {
    Avatar,
    Button, Checkbox,
    FormControl, FormControlLabel, FormHelperText,
    Grid,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import AlertIndicator, {AlertPopup} from "../components/alerts/AlertIndicator";
import {routes} from "./AppViews";
import colors from "../styles/colors.module.scss";
import {useTranslation} from "react-i18next";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
    isValidDate,
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidPhoneNumberIsrael
} from '../utils/validationFunctionsCollection';
import EventTypeSelector from "../components/event-type-selector/EventTypeSelector";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {User, UserDetailsInterface, UserInterface} from "../types/User";
import {toUpperCaseCleanName} from "../utils/stringFunctionsCollection";
import {EventTypes, UserEventDetails} from "../types/UserEventDetails";
import {EventOwnerInterface} from "../types/EventOwner";
import AlertWithConfirmation from "../components/alerts/AlertWithConfirmation";
import Spinner from "../components/spinner/Spinner";
import axios from "axios";
import {API_URLS} from "../api/api";
import DoneIcon from '@mui/icons-material/Done';
import Container from "@mui/material/Container";

const Registration: React.FC = () => {
    let navigate = useNavigate();
    const {t} = useTranslation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventOwner1, setEventOwner1] = useState("");
    const [eventOwner2, setEventOwner2] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [termAndConditions, setTermAndConditions] = useState(false);
    const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const [openAlertConfirm, setOpenAlertConfirm] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const riseExceptionAlert = (message: string) => {
        setAlertPopup({
            ...alertPopup,
            open: true,
            vertical: "top",
            horizontal: "center",
            severityInfo: "error",
            messageInfo: message ? message : `${t('registration.validation.general')}`,
            time: 6000
        });
    };

    const redirectToLogin = () => {
        navigate(routes.login, {replace: true});
    }
    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const validateInputsClient = async () => {
        if (!await isValidName(firstName)) {
            console.log("error firstName");
            riseExceptionAlert(t('registration.validation.firstname'));
            return false;
        }
        if (!await isValidName(lastName)) {
            console.log("error lastname");
            riseExceptionAlert(t('registration.validation.lastname'));
            return false;
        }
        if (!await isValidEmail(email)) {
            console.log("error email");
            riseExceptionAlert(t('registration.validation.email'));
            return false;
        }
        if (phone !== '' && !isValidPhoneNumberIsrael(phone)) {
            console.log("error phone");
            riseExceptionAlert(t('registration.validation.phone'));
            return false;
        }
        if (!await isValidPassword(password)) {
            console.log("error password");
            riseExceptionAlert(t('registration.validation.password'));
            return false;
        }
        if (password !== repeatPassword) {
            console.log("error password not match!!!");
            riseExceptionAlert(t('registration.validation.repeat_password'));
            return false;
        }
        if (eventType === "") {
            console.log("error eventOwner1");
            riseExceptionAlert(t('registration.validation.event_type'));
            return false;
        }
        if (eventType !== EventTypes.WEDDING) {
            if (!await isValidName(eventOwner1)) {
                console.log("error eventOwner1");
                riseExceptionAlert(t('registration.validation.owner_name'));
                return false;
            }
        }
        if (eventType === EventTypes.WEDDING) {
            if (!await isValidName(eventOwner1)) {
                console.log("error breed name");
                riseExceptionAlert(t('registration.validation.bride_name'));
                return false;
            }
            if (!await isValidName(eventOwner2)) {
                console.log("error eventOwner2");
                riseExceptionAlert(t('registration.validation.groom_name'));
                return false;
            }
        }
        if (eventDate !== '' && !isValidDate(eventDate)) {
            riseExceptionAlert(t('registration.validation.event_date'));
            return false;
        }
        if (!termAndConditions) {
            console.log("error termAndConditions");
            riseExceptionAlert(t('registration.validation.terms'));
            return false;
        }
        return true;
    };



    const handleSubmit: any = async (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        const isValid = await validateInputsClient();
        if (!isValid) {
            setIsLoading(false);
            return;

        }
        // todo: add validation from the server

        const userDetails: UserDetailsInterface = {
            firstName: toUpperCaseCleanName(firstName),
            lastName: toUpperCaseCleanName(lastName),
            email: email,
            password: password,
            phone: phone
        };

        const eventDetails: UserEventDetails = {
            eventName: eventType === EventTypes.WEDDING ? `${t('registration.wedding')} ${eventOwner1} & ${eventOwner2}` : eventOwner1,
            eventType: eventType,
            eventDate: eventDate,
            eventLocation: {locationName: "", locationLink: ""}
        };
        // todo: Change to server data transfer object instead mock server object
        const user = new User(userDetails, eventDetails);

        if (eventType === EventTypes.WEDDING) {
            const bride: EventOwnerInterface = {
                id: 1,
                isAdmin: true,
                name: eventOwner1,
                type: 'bride'
            };
            const groom: EventOwnerInterface = {
                id: 2,
                isAdmin: true,
                name: eventOwner2,
                type: 'groom'
            };
            user.setEventOwnerList([bride, groom]);

        }
        try {
            const url = `${API_URLS.BASE_URL_MOCK_SERVER}/${API_URLS.USERS}`;
            const response = await axios.post(url, user);
            setIsLoading(false);
            setOpenAlertConfirm(true);
        } catch (error) {
            console.log("Error occurred in server while try to register new user");
            riseExceptionAlert(t('registration.error_occurred'));
            console.error(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <Spinner/>
        );
    }

    return (
        <Container fixed>
            <form onSubmit={handleSubmit} style={{position: "relative", top: "1em"}}>
                <Grid style={{display: "flex", justifyContent: "center"}}>
                    <Avatar style={{fontSize: "5em"}}>
                        <AppRegistrationIcon/>
                    </Avatar>
                </Grid>
                <Grid style={{display: "flex", justifyContent: "center", marginBottom: "1vh"}}>
                    <Typography component="h1" variant="h5">
                        {t('registration.register')}
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                value={firstName}
                                name="firstName"
                                variant="standard"
                                fullWidth
                                id="firstName"
                                placeholder={`${t('registration.first_name')}`}
                                onChange={(event) => {
                                    setFirstName(event.target.value);
                                }}
                            />
                            <FormHelperText>{`* ${t('registration.first_name')}`}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                variant="standard"
                                value={lastName}
                                fullWidth
                                id="lastName"
                                placeholder={t('registration.last_name')}
                                name="lastName"
                                onChange={(event) => {
                                    setLastName(event.target.value);
                                }}
                            />
                            <FormHelperText>{`* ${t('registration.last_name')}`}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
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
                            <FormHelperText>{`* ${t('registration.email')}`}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                value={phone}
                                fullWidth
                                id="phone"
                                placeholder={t('registration.phone')}
                                type="text"
                                name="phone"
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                            />
                            <FormHelperText>{t('registration.phone')}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
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
                            <FormHelperText>{`* ${t('registration.password')}`}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                variant="standard"
                                required
                                value={repeatPassword}
                                fullWidth
                                name="repeat-password"
                                placeholder={t('registration.repeat_password')}
                                type="password"
                                id="repeat-password"
                                autoComplete="current-password"
                                onChange={(event: any) => {
                                    setRepeatPassword(event.target.value);
                                }}
                            />
                            <FormHelperText>{`* ${t('registration.repeat_password')}`}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <EventTypeSelector
                            eventType={eventType}
                            setEventType={setEventType}
                            eventOwner1={eventOwner1}
                            setEventOwner1={setEventOwner1}
                            eventOwner2={eventOwner2}
                            setEventOwner2={setEventOwner2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{minWidth: 120}}>
                            <Tooltip title={`${t('registration.date_explain')}`}>
                                <TextField
                                    style={{width: "100%"}}
                                    id="datetime-local"
                                    label={t('registration.date_label')}
                                    type="datetime-local"
                                    // defaultValue="2017-05-24T10:30"
                                    value={eventDate}
                                    sx={{width: 250}}
                                    onChange={(event: any) => {
                                        setEventDate(event.target.value);
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Tooltip>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid>
                    <FormControlLabel
                        value={termAndConditions}
                        control={<Checkbox checked={termAndConditions}
                                           onChange={() => setTermAndConditions(!termAndConditions)}
                        />}
                        label={(String)(t('registration.accept_conditions'))}
                        labelPlacement="start"
                    />
                </Grid>
                <Grid>
                    <Button
                        style={{marginTop: "2vh"}}
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        color="primary"
                        onClick={(event: any) => {
                            handleSubmit(event);
                        }}
                    >
                        {t('registration.signup')}
                        <ExitToAppIcon style={{margin: "0 0.5vw"}}/>
                    </Button>
                </Grid>


                <Grid item style={{marginTop: "2vh"}}>
                    <Link to={routes.login}
                          style={{textDecoration: "underline", color: colors.textSecondary}}
                    >
                        {t('registration.already_registered')}
                    </Link>
                </Grid>
            </form>
            <AlertWithConfirmation title={t('registration.registration_completed')}
                                   message={t('registration.redirect_login')}
                                   open={openAlertConfirm}
                                   setOpen={setOpenAlertConfirm}
                                   action={redirectToLogin}
                                   icon={<DoneIcon/>}
            />
            <AlertIndicator
                alertPopup={alertPopup}
                closeAlert={closeAlert}

            />
        </Container>
    );
};

export default Registration;
