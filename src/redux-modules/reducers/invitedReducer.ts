import {UserActionTypes} from "../action-types/userActionTypes";
import {UserInterface} from "../../types/User";

const initialState: UserInterface = {
    auth: {isLoggedIn: false},
};

const invitedReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            debugger;
            return action.payload;
        case UserActionTypes.ERROR:
            console.error("Error from UserReducer: " + action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
export default invitedReducer;