import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AlertToast, { AlertPopup } from "../components/alerts/AlertToast";
import { routes } from "./AppViews";
import colors from "../styles/colors.module.scss";
import { useTranslation } from "react-i18next";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  isValidDate,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhoneNumberIsrael,
} from "../utils/validationFunctionsCollection";
import EventTypeSelector from "../components/event-type-selector/EventTypeSelector";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { toUpperCaseCleanName } from "../utils/stringFunctionsCollection";
import AlertWithConfirmation from "../components/alerts/AlertWithConfirmation";
import axios from "axios";
import { API_URLS } from "../api/api";
import DoneIcon from "@mui/icons-material/Done";
import { User, UserRegistrationRequestDTO } from "../interfaces/User";
import { EventDetails, EventTypes } from "../interfaces/EventDetails";
import { EventOwner } from "../interfaces/EventOwner";
import { updateIsAppLoading } from "../redux-modules/actions/appActions";
import { StateSelectors } from "../redux-modules/selectores/stateSelectores";
import commonStyle from "../styles/commonStyles.module.scss";

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const application = useSelector(StateSelectors.application);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventOwnerOrName, setEventOwnerOrName] = useState("");
  const [eventOwner2, setEventOwner2] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [termAndConditions, setTermAndConditions] = useState(false);
  const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [openAlertConfirm, setOpenAlertConfirm] = React.useState(false);

  const riseExceptionAlert = (message: string) => {
    setAlertPopup({
      ...alertPopup,
      open: true,
      vertical: "top",
      horizontal: "center",
      severityInfo: "error",
      messageInfo: message
        ? message
        : `${t("registration.validation.general")}`,
      time: 6000,
    });
  };

  const redirectToLogin = () => {
    navigate(routes.login, { replace: true });
  };
  const closeAlert = () => {
    setAlertPopup({ ...alertPopup, open: false });
  };

  const validateInputsClient = async () => {
    if (!(await isValidName(firstName))) {
      console.log("error firstName");
      riseExceptionAlert(t("registration.validation.firstname"));
      return false;
    }
    if (lastName !== "" && !(await isValidName(lastName))) {
      console.log("error lastname");
      riseExceptionAlert(t("registration.validation.lastname"));
      return false;
    }
    if (!(await isValidEmail(email))) {
      console.log("error email");
      riseExceptionAlert(t("registration.validation.email"));
      return false;
    }
    if (phone !== "" && !isValidPhoneNumberIsrael(phone)) {
      console.log("error phone");
      riseExceptionAlert(t("registration.validation.phone"));
      return false;
    }
    if (!(await isValidPassword(password))) {
      console.log("error password");
      riseExceptionAlert(t("registration.validation.password"));
      return false;
    }
    if (password !== repeatPassword) {
      console.log("error password not match!!!");
      riseExceptionAlert(t("registration.validation.repeat_password"));
      return false;
    }
    if (eventType === "") {
      console.log("error eventOwner1");
      riseExceptionAlert(t("registration.validation.event_type"));
      return false;
    }
    if (eventType !== EventTypes.WEDDING && eventOwnerOrName === "") {
      riseExceptionAlert(t("registration.validation.event_name"));
      return false;
    }
    if (eventType === EventTypes.WEDDING) {
      if (!(await isValidName(eventOwnerOrName))) {
        console.log("error breed name");
        riseExceptionAlert(t("registration.validation.bride_name"));
        return false;
      }
      if (!(await isValidName(eventOwner2))) {
        console.log("error eventOwner2");
        riseExceptionAlert(t("registration.validation.groom_name"));
        return false;
      }
    }
    if (eventDate !== "" && !isValidDate(eventDate)) {
      riseExceptionAlert(t("registration.validation.event_date"));
      return false;
    }
    if (!termAndConditions) {
      riseExceptionAlert(t("registration.validation.terms"));
      return false;
    }
    return true;
  };

  const handleSubmit: any = async (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    dispatch(updateIsAppLoading(true));
    const isValid = await validateInputsClient();
    if (!isValid) {
      dispatch(updateIsAppLoading(false));
      return;
    }

    const userDetails: User = {
      firstName: toUpperCaseCleanName(firstName),
      lastName: toUpperCaseCleanName(lastName),
      email: email,
      phone: phone,
      password: password,
    };

    const eventDetails: EventDetails = {
      eventName:
        eventType === EventTypes.WEDDING
          ? `${t("registration.wedding")} ${eventOwnerOrName} & ${eventOwner2}`
          : eventOwnerOrName,
      eventType:
        eventType === EventTypes.WEDDING
          ? EventTypes.WEDDING
          : EventTypes.PRIVATE_EVENT,
      eventDate: eventDate,
    };
    let newUser: UserRegistrationRequestDTO = {
      userDetails,
      eventDetails,
    };

    if (eventType === EventTypes.WEDDING) {
      const bride: EventOwner = {
        isAdmin: true,
        name: eventOwnerOrName,
      };
      const groom: EventOwner = {
        isAdmin: true,
        name: eventOwner2,
      };
      newUser = {
        ...newUser,
        bride,
        groom,
      };
    }

    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}`;
      const response = await axios.post(url, newUser);
      if (response.status == 201) {
        dispatch(updateIsAppLoading(false));
        setOpenAlertConfirm(true);
      } else {
        throw "In valid operation occurred while tried to signup";
      }
    } catch (error) {
      console.log("Error occurred in server while try to register new user");
      riseExceptionAlert(t("registration.error_occurred"));
      console.error(error);
      dispatch(updateIsAppLoading(false));
    }
  };

  return (
    <div style={{ marginBottom: "4em" }}>
      <form onSubmit={handleSubmit}>
        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <Avatar style={{ fontSize: "5em" }}>
            <AppRegistrationIcon />
          </Avatar>
        </Grid>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1vh",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("registration.register")}
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
                placeholder={`${t("registration.first_name")}`}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{`* ${t(
                "registration.first_name"
              )}`}</FormHelperText>
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
                placeholder={t("registration.last_name")}
                name="lastName"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{`* ${t(
                "registration.last_name"
              )}`}</FormHelperText>
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
                placeholder={t("registration.email")}
                type="email"
                name="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{`* ${t("registration.email")}`}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                value={phone}
                fullWidth
                id="phone"
                placeholder={t("registration.phone")}
                type="text"
                name="phone"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{t("registration.phone")}</FormHelperText>
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
                placeholder={`* ${t("registration.password")}`}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{`* ${t(
                "registration.password"
              )}`}</FormHelperText>
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
                placeholder={t("registration.repeat_password")}
                type="password"
                id="repeat-password"
                autoComplete="current-password"
                onChange={(event: any) => {
                  setRepeatPassword(event.target.value);
                }}
                disabled={application.isAppLoading}
              />
              <FormHelperText>{`* ${t(
                "registration.repeat_password"
              )}`}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <EventTypeSelector
              eventType={eventType}
              setEventType={setEventType}
              input1={eventOwnerOrName}
              setInput1={setEventOwnerOrName}
              input2={eventOwner2}
              setInput2={setEventOwner2}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Tooltip title={`${t("registration.date_explain")}`}>
                <TextField
                  fullWidth
                  id="datetime-local"
                  label={t("registration.date_label")}
                  type="datetime-local"
                  disabled={application.isAppLoading}
                  value={eventDate}
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
          <Grid item xs={12} md={6}>
            <FormControlLabel
              value={termAndConditions}
              control={
                <Checkbox
                  checked={termAndConditions}
                  onChange={() => setTermAndConditions(!termAndConditions)}
                />
              }
              label={String(t("registration.accept_conditions"))}
              labelPlacement="start"
              disabled={application.isAppLoading}
            />
          </Grid>
         
        </Grid>

        <Grid>
          <Button
            className={commonStyle.button}
            style={{ marginTop: "2vh" }}
            type="submit"
            variant="contained"
            disabled={application.isAppLoading}
            color="primary"
            onClick={(event: any) => {
              handleSubmit(event);
            }}
          >
            {t("registration.signup")}
            <ExitToAppIcon style={{ margin: "0 0.5vw" }} />
          </Button>
        </Grid>

        <Grid item style={{ marginTop: "2vh" }}>
          <Link
            to={routes.login}
            style={{ textDecoration: "underline", color: colors.textSecondary }}
          >
            {t("registration.already_registered")}
          </Link>
        </Grid>
      </form>
      <AlertWithConfirmation
        title={t("registration.registration_completed")}
        message={t("registration.redirect_login")}
        open={openAlertConfirm}
        setOpen={setOpenAlertConfirm}
        action={redirectToLogin}
        icon={<DoneIcon />}
      />
      <AlertToast alertPopup={alertPopup} closeAlert={closeAlert} />
    </div>
  );
};

export default Registration;
