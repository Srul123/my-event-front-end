import {EventDetailsActionTypes} from "../action-types/eventDetailsActionTypes";
import {EventDetailsInterface} from "../../types/EventDetails";


export const setEventDetails = (eventDetails: EventDetailsInterface | undefined) => {
    return {
        type: EventDetailsActionTypes.SET_EVENT_DETAILS,
        payload: eventDetails
    };
};



