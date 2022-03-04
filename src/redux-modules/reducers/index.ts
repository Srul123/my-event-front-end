import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import eventDetailsReducer from "./eventDetailsReducer";
import groupReducer from "./groupReducer";
import ownerReducer from "./ownerReducer";
import invitedReducer from "./invitedReducer";
import shuttleReducer from "./shuttleReducer";
import tagReducer from "./tagReducer";
import filterReducer from "./filterReducer";


export default combineReducers({
    user: userReducer,
    eventDetails: eventDetailsReducer,
    invited: invitedReducer,
    group: groupReducer,
    owner: ownerReducer,
    tag: tagReducer,
    shuttle: shuttleReducer,
    filter: filterReducer
});

