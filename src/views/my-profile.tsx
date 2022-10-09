import React from "react";
import { Container, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { StateSelectors } from "../redux-modules/selectores/stateSelectores";

const MyProfile: React.FC = () => {
  const eventDetails = useSelector(StateSelectors.eventDetails);

  return (
    <>
      <Paper>
        <div
          className="top-title-page"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div>
            <Typography variant="h4">{eventDetails.eventName}</Typography>
            {eventDetails.eventLocation && (
              <Typography variant="h6" align="center">
                {eventDetails.eventLocation?.locationName}
              </Typography>
            )}
          </div>
          {eventDetails.eventDate !== "" && (
            <div
              className={"event-times"}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">
                שעת האירוע:{" "}
                {new Date(String(eventDetails.eventDate)).toLocaleTimeString(
                  "en-GB",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </Typography>
            </div>
          )}
        </div>
      </Paper>
      <div style={{ marginTop: "2vh" }}>
        <Grid container spacing={1}>
          <Grid item xs={4} className={"event-info"}>
            <Paper>
              <Typography variant={"h6"}>סה"כ מוזמנים: </Typography>
            </Paper>
          </Grid>
          <Grid className={"event-info"} item xs={4}>
            <Paper>
              <Typography variant={"h6"}>אשרו הגעה: </Typography>
              <Typography variant={"h6"}> אולי:</Typography>
              <Typography variant={"h6"}>לא מגיעים:</Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default MyProfile;
