import {FilterActionTypes} from "../action-types/filterActionTypes";
import {EventDetailsInterface} from "../../types/EventDetails";
import {EventDetailsActionTypes} from "../action-types/eventDetailsActionTypes";

const initialState: EventDetailsInterface = {
    eventName: "",
    eventDate: "",
    eventLocation: {locationName: "", locationLink: ""},
    eventType: ""
};

const filterReducer = (state = initialState, action: { type: any; payload: EventDetailsInterface; }) => {
    switch (action.type) {
        case EventDetailsActionTypes.SET_EVENT_DETAILS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
export default filterReducer;