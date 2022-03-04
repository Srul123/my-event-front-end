import {UserActionTypes} from "../action-types/userActionTypes";

const initialState: {} = {
    auth: {isLoggedIn: false},
    userDetails: {},
    eventDetails: {}
};

export interface UserData {
    userDetails: any,
    eventDetails: any
}

const userReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            const userData: UserData = action.payload;
            return {
                ...state,
                auth: {isLoggedIn: true},
                userDetails: userData.eventDetails,
                eventDetails: userData.eventDetails
            };

        case UserActionTypes.LOGOUT:
            return initialState;

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