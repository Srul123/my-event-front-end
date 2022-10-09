import React from "react";
import Paper from "@mui/material/Paper";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch, useSelector } from "react-redux";
import { StateSelectors } from "../../redux-modules/selectores/stateSelectores";
import {
  EventDetails as EventDetailsInterface,
  EventTypes,
} from "../../interfaces/EventDetails";
import {
  putEventDetails,
  updateEventDetails,
} from "../../redux-modules/actions/eventDetailsActions";
import AlertToast, { AlertPopup } from "../../components/alerts/AlertToast";
import "./event-details.scss";
import commonStyles from "../../styles/commonStyles.module.scss";
import { updateIsAppLoading } from "../../redux-modules/actions/appActions";
import ImageInvitation from "../../components/image-invitation/ImageInvitation";
import { useTranslation } from "react-i18next";

const EventDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const application = useSelector(StateSelectors.application);
  const eventDetails = useSelector(StateSelectors.eventDetails);

  const [eventName, setEventName] = React.useState(eventDetails.eventName);
  const [eventType, setEventType] = React.useState(eventDetails.eventType);
  const [eventTimeAndDate, setEventTimeAndDate] = React.useState(
    eventDetails.eventDate
  );
  const [locationName, setLocationName] = React.useState(
    eventDetails.eventLocation?.locationName
  );
  const [locationLink, setLocationLink] = React.useState(
    eventDetails.eventLocation?.locationLink
  );
  const [alertPopup, setAlertPopup] = React.useState<AlertPopup>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  // todo add modal event page
  const [openMyEventPageModal, setOpenMyEventPageModal] = React.useState(false);

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(updateIsAppLoading(true));
    const updatedEventDetails: EventDetailsInterface = {
      ...eventDetails,
      eventName: eventName,
      eventType: eventType,
      eventDate: eventTimeAndDate,
      eventLocation: {
        locationName,
        locationLink,
      },
    };
    try {
      await dispatch(
        putEventDetails(updatedEventDetails, application.auth.token)
      );
      riseToastAlert("success", "Saved");
    } catch (e) {
      riseToastAlert("error", "Cannot save event details");
      console.log("error Cannot save event details");
    } finally {
      dispatch(updateIsAppLoading(false));
    }
  };

  const closeAlert = () => {
    setAlertPopup({ ...alertPopup, open: false });
  };

  const riseToastAlert = (severityInfo: any, messageInfo: string) => {
    setAlertPopup({
      ...alertPopup,
      open: true,
      severityInfo: severityInfo,
      messageInfo: messageInfo,
    });
  };

  return (
    <Container fixed>
      <div id={"event-details"}>
        <Typography variant="h3" component="h3" align="center">
          {t("event_details.title")}
        </Typography>
        <Paper>
          <form noValidate autoComplete="off" className={"event-form"}>
            <div>
              <TextField
                fullWidth
                id="eventName"
                label={t("event_details.event_name")}
                variant="outlined"
                value={eventName}
                onChange={(event) => setEventName(event.target.value)}
              />
            </div>
            <div>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  {t("event_details.event_type")}
                </InputLabel>
                <Select
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={eventType}
                  onChange={(event) => setEventType(String(event.target.value))}
                  label="Event type"
                >
                  <MenuItem value={EventTypes.WEDDING}>
                    {t("event_details.wedding")}
                  </MenuItem>
                  <MenuItem value={EventTypes.PRIVATE_EVENT}>
                    {t("event_details.private_event")}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Tooltip title={`${t("event_details.open_calander")}`}>
                <TextField
                  fullWidth
                  label={`${t("event_details.date_and_time")}`}
                  type="datetime-local"
                  value={eventTimeAndDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => setEventTimeAndDate(event.target.value)}
                />
              </Tooltip>
            </div>
            <div>
              <TextField
                fullWidth
                label={`${t("event_details.name_location")}`}
                variant="filled"
                value={locationName}
                onChange={(event) => setLocationName(event.target.value)}
              />
              <TextField
                fullWidth
                label={`${t("event_details.location_link")}`}
                variant="filled"
                value={locationLink}
                onChange={(event) => setLocationLink(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Tooltip title={`${t("event_details.tooltip_save")}`}>
                  <Button
                    className={commonStyles.button}
                    variant="contained"
                    color="primary"
                    onClick={(event) => handleSubmit(event)}
                  >
                    {`${t("event_details.save")}`} <SaveIcon style={{ margin: "0 1vw" }} />
                  </Button>
                </Tooltip>
              </div>
              <div>
                <Tooltip title={`${t("event_details.tooltio_demo_page")}`}>
                  <Button
                    className={commonStyles.button}
                    color="primary"
                    onClick={() => setOpenMyEventPageModal(true)}
                  >
                    {`${t("event_details.event_page")}`}
                    <EventAvailableIcon style={{ margin: "0 1vw" }} />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ImageInvitation />
            </div>
          </form>
        </Paper>
      </div>
      {/*<EventDetailsPageModal openMyEventPageModal={openMyEventPageModal}*/}
      {/*                       setOpenMyEventPageModal={setOpenMyEventPageModal}/>*/}
      <AlertToast alertPopup={alertPopup} closeAlert={closeAlert} />
    </Container>
  );
};

export default EventDetails;
