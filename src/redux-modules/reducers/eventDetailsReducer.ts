import {EventDetails} from "../../interfaces/EventDetails";
import {EventDetailsActionTypes} from "../action-types/eventDetailsActionTypes";

const initialState: EventDetails = {
    eventName: "",
    eventDate: "",
    eventLocation: {locationName: "", locationLink: ""},
    eventType: ""
};

const eventDetailsReducer = (state = initialState, action: { type: any; payload: EventDetails; }) : EventDetails => {
    switch (action.type) {
        case EventDetailsActionTypes.UPDATE_EVENT_DETAILS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
export default eventDetailsReducer;