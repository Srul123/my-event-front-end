import {EventDetailsActionTypes} from "../action-types/eventDetailsActionTypes";
import {EventDetails} from "../../interfaces/EventDetails";


export const setEventDetails = (eventDetails: EventDetails | undefined) => {
    return {
        type: EventDetailsActionTypes.SET_EVENT_DETAILS,
        payload: eventDetails
    };
};



