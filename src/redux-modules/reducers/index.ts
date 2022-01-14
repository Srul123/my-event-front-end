import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import {UserInterface} from "../../types/User";


export default combineReducers({
    user: userReducer
});

export interface ModuleReducers {
    user: UserInterface
}