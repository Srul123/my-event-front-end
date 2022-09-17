import {combineReducers} from 'redux';
import appReducer, {ApplicationReducer} from "./appReducer";
import eventDetailsReducer from "./eventDetailsReducer";
import groupReducer from "./groupReducer";
import ownerReducer from "./ownerReducer";
import invitedReducer from "./invitedReducer";
import shuttleReducer from "./shuttleReducer";
import tagReducer from "./tagReducer";
import filterReducer from "./filterReducer";
import {EventDetails} from "../../interfaces/EventDetails";

export default combineReducers({
    application: appReducer,
    eventDetails: eventDetailsReducer,
    invited: invitedReducer,
    group: groupReducer,
    owner: ownerReducer,
    tags: tagReducer,
    shuttle: shuttleReducer,
    filters: filterReducer,
});

export interface RootState {
    application: ApplicationReducer,
    eventDetails: EventDetails,
    invited: any,
    group: any,
    owner: any,
    tags: any,
    shuttle: any,
    filters: any,
}

