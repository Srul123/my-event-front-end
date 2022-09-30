import {combineReducers} from 'redux';
import appReducer, {ApplicationReducer} from "./appReducer";
import eventDetailsReducer from "./eventDetailsReducer";
import groupReducer from "./groupReducer";
import ownerReducer from "./ownerReducer";
import invitedGuestReducer from "./invitedReducer";
import shuttleReducer from "./shuttleReducer";
import tagReducer from "./tagReducer";
import filterReducer from "./filterReducer";
import {EventDetails} from "../../interfaces/EventDetails";

export default combineReducers({
    application: appReducer,
    eventDetails: eventDetailsReducer,
    invitedGuests: invitedGuestReducer,
    groups: groupReducer,
    eventOwners: ownerReducer,
    tags: tagReducer,
    shuttles: shuttleReducer,
    filters: filterReducer,
});

export interface RootState {
    application: ApplicationReducer,
    eventDetails: EventDetails,
    invitedGuests: any,
    group: any,
    eventOwners: any,
    tags: any,
    shuttles: any,
    filters: any,
}

