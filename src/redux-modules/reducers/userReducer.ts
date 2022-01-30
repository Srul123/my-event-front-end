import {UserActionTypes} from "../action-types/userActionTypes";
import {UserInterface} from "../../types/User";

const initialState: UserInterface = {
    auth: {isLoggedIn: false},
};

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            debugger;
            return action.payload;
        case UserActionTypes.LOGOUT:
            return initialState;
        case UserActionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            };
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
export default userReducer;