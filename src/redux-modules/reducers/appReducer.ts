import {AppActionTypes} from "../action-types/appActionTypes";
import {Local} from "../../interfaces/Locales";
import {User} from "../../interfaces/User";

export interface ApplicationReducer  {
    isAppLoading: boolean;
    auth:  {
        isLoggedIn:  false;
        token: string
    };
    user: User;
    local: Local;
    error: any;
}

const initialState: ApplicationReducer = {
    isAppLoading: false,
    auth: {
        isLoggedIn: false,
        token: ""
    },
    user: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    },
    local: {},
    error: undefined
};



const appReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case AppActionTypes.LOGIN:
            return {
                ...state,
                user: action.payload.user,
                auth: {
                    isLoggedIn: true,
                    token:action.payload.token
                }
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