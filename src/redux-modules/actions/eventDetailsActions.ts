import { EventDetailsActionTypes } from "../action-types/eventDetailsActionTypes";
import { EventDetails } from "../../interfaces/EventDetails";
import axios from "axios";
import { API_URLS } from "../../api/api";

// internal calls

export const updateEventDetails = (eventDetails: EventDetails) => {
  return {
    type: EventDetailsActionTypes.UPDATE_EVENT_DETAILS,
    payload: eventDetails,
  };
};

// external APIs calss with thunk...

export const putEventDetails =
  (eventDetails: EventDetails, token: String) =>
  async (dispatch: (arg0: { type: any; payload: any }) => any) => {
    debugger;
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const url = `${API_URLS.BASE_URL}/${API_URLS.EVENT_DETAILS}`;
      const response = await axios.put(url, eventDetails, { headers });
      if (response.status===200) {
        dispatch({
            type: EventDetailsActionTypes.UPDATE_EVENT_DETAILS,
            payload: response.data,
          });
      } else {
        throw new Error("Can't update event details");
      }
    } catch (e) {
      console.log("Error from eventDetails action: putEventDetails");
      console.log(e);
      dispatch({
        type: EventDetailsActionTypes.ERROR,
        payload: "Can't update Event details",
      });
    }
  };
