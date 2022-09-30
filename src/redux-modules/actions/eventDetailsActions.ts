import {EventDetailsActionTypes} from "../action-types/eventDetailsActionTypes";
import {EventDetails} from "../../interfaces/EventDetails";


export const updateEventDetails = (eventDetails: EventDetails) => {
    return {
        type: EventDetailsActionTypes.UPDATE_EVENT_DETAILS,
        payload: eventDetails
    };
};



