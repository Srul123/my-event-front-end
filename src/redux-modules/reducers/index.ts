import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";
import ownerReducer from "./ownerReducer";
import invitedReducer from "./invitedReducer";
import shuttleReducer from "./shuttleReducer";
import tagReducer from "./tagReducer";
import filterReducer from "./filterReducer";


export default combineReducers({
    user: userReducer,
    invited: invitedReducer,
    group: groupReducer,
    owner: ownerReducer,
    tag: tagReducer,
    shuttle: shuttleReducer,
    filter: filterReducer
});

