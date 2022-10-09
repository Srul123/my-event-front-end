import {combineReducers} from 'redux';
import appReducer, {ApplicationReducer} from "./appReducer";
import eventDetailsReducer from "./eventDetailsReducer";
import groupReducer, { GroupReducer } from "./groupReducer";
import ownerReducer, { OwnerReducer } from "./ownerReducer";
import invitedGuestReducer, { InvitedReducer } from "./invitedReducer";
import shuttleReducer, { ShuttleReducer } from "./shuttleReducer";
import tagReducer, { TagReducer } from "./tagReducer";
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
    invitedGuests: InvitedReducer,
    group: GroupReducer,
    eventOwners: OwnerReducer,
    tags: TagReducer,
    shuttles: ShuttleReducer,
    filters: any,
}

