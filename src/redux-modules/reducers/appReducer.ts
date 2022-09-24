import {AppActionTypes} from "../action-types/appActionTypes";
import {Local} from "../../interfaces/Locales";
import {User} from "../../interfaces/User";

export interface ApplicationReducer  {
    isAppLoading: boolean;
    isLoggedIn:  boolean;
    userDetails: User;
    local: Local;
    error: any;
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
    local: { },
    error: undefined
};



const appReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case AppActionTypes.LOGIN:
            return {
                ...state,
                isLoggedIn:  true,
                userDetails: action.payload
            };
        case AppActionTypes.LOGOUT:
            return initialState;
        case AppActionTypes.LOADING:
            return {
                ...state,
                isAppLoading: action.payload
            };
        case AppActionTypes.LOCAL_LANGUAGE:
            return {
                ...state,
                local: action.payload
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