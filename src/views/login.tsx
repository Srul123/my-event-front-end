import React from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from "react-router-dom";
import AlertIndicator, {AlertPopup} from "../components/alerts/AlertIndicator";
import Spinner from "../components/layouts/spinner/Spinner";
import {isValidEmail, isValidPassword} from "../utils/validationFunctionsCollection";
import {useTranslation} from "react-i18next";
import {User} from "../interfaces/User";
import {routes} from "./AppViews";
import {API_URLS} from "../api/api";
import {loginUser} from "../redux-modules/actions/appActions";
import {setInvitedList} from "../redux-modules/actions/invitedActions";
import {setGroupList} from "../redux-modules/actions/groupActions";
import {setOwnerList} from "../redux-modules/actions/ownerActions";
import {setShuttleList} from "../redux-modules/actions/shuttleActions";
import {setTagList} from "../redux-modules/actions/tagActions";
import {setEventDetails} from "../redux-modules/actions/eventDetailsActions";


export default function Login() {
    const {t} = useTranslation();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
        open: false,
        vertical: "top",
        horizontal: "center",
    });

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

    const closeAlert = () => {
        setAlertPopup({...alertPopup, open: false});
    };

    const loadDataToReduxState = (userData: User) => {
        // const personalDetails = userData.personalDetails;
        // dispatch(loginUser(personalDetails));
        // const eventDetails = userData.data?.eventDetails;
        // dispatch(setEventDetails(eventDetails));
        // const invitedList = userData.data?.invitedList;
        // dispatch(setInvitedList(invitedList));
        // const groupList = userData.data?.groupList;
        // dispatch(setGroupList(groupList));
        // const eventOwnerList = userData.data?.eventOwnerList;
        // dispatch(setOwnerList(eventOwnerList));
        // const shuttleList = userData.data?.shuttleList;
        // dispatch(setShuttleList(shuttleList));
        // const tagList = userData.data?.eventTagList;
        // dispatch(setTagList(tagList));
    };

    const handleSubmit = async (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);
        if (!await isValidEmail(email)) {
            console.log("error email");
            riseExceptionAlert(t('registration.validation.email'));
            setLoading(false);
            return;
        }
        if (!await isValidPassword(password)) {
            console.log("error password");
            riseExceptionAlert(t('registration.validation.password'));
            setLoading(false);
            return;
        }

        try {
            const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}`;
            const response = await axios.get(url);
            const data: User[] = response.data;
            const foundUser = data.find((user: User) => {
                // return (
                //     user.personalDetails?.password === password
                //     &&
                //     user.personalDetails.email === email
                // );
            });
            if (!foundUser) {
                console.log("error password");
                riseExceptionAlert(t("login.valid.wrong_details"));
                setLoading(false);
                return;
            }
            loadDataToReduxState(foundUser);
            setLoading(false);
            navigate(routes.myProfile, {replace: true});
        } catch (error) {
            riseExceptionAlert(t("login.valid.wrong_server"));
            console.log("Error from server while try to login");
            console.log(error);
        }
    };

    if (loading) {
        return <Spinner/>;
    }

    return (
        <Container maxWidth={"sm"}>
            <div style={{position: "relative", top: "1em"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Avatar>
                        <LockIcon/>
                    </Avatar>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginBottom: "1vh"}}>
                    <Typography component="h1" variant="h5">
                        {t("login.sign_in")}
                    </Typography>
                </div>

                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={t("login.email")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={t("login.password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label={`${t("login.remember")}`}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        {t("login.sign_in")}
                    </Button>
                    <Grid style={{marginTop: "2vh"}}>
                        <Grid item xs>
                            <NavLink to="/"> {t("login.forgot")}</NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/signup">{t("login.account")}</NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <AlertIndicator
                alertPopup={alertPopup}
                closeAlert={closeAlert}
            />
        </Container>
    );
}
