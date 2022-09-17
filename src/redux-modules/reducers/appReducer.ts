import {AppActionTypes} from "../action-types/appActionTypes";
import {Local} from "../../interfaces/Locales";
import {User} from "../../interfaces/User";

export interface ApplicationReducer  {
    isAppLoading: boolean;
    isLoggedIn:  boolean;
    userDetails: User;
    local: Local;
}

const initialState: ApplicationReducer = {
    isAppLoading: false,
    isLoggedIn:  false,
    userDetails: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    },
    local: { }
};



const appReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case AppActionTypes.LOGIN:
            return {
                ...state,
                auth: {isLoggedIn: true},
                personalDetails: action.payload
            };

        case AppActionTypes.LOGOUT:
            return initialState;
        case AppActionTypes.SET_LOCAL_LANGUAGE:
            return {
                ...state,
                ...action.payload
            };
        case AppActionTypes.SET_DEVICE_MODE:
            return {
                ...state,
                device: action.payload
            };
        case AppActionTypes.ERROR:
            console.error("Error from UserReducer: " + action.payload);
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
export default appReducer;