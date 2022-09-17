import axios from "axios";
import {AppActionTypes} from "../action-types/appActionTypes";
import {API_URLS} from "../../api/api";
import {User} from "../../interfaces/User";
import {DeviceModes, Local} from "../../interfaces/Locales";



export const loginUser = (personalDetails: User | undefined) => {
    return {
        type: AppActionTypes.LOGIN,
        payload: personalDetails,
    };
};

export const logoutUser = () => {
    return {
        type: AppActionTypes.LOGOUT
    };
};

export const updateUserDetails = (user: any) => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    let response;
    try {
        const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}/${user.id}`;
        response = await axios.put(url, user);
        dispatch({
            type: AppActionTypes.UPDATE_USER,
            payload: response.data
        });
    } catch (e) {
        console.log("Error from user action: updateUserDetails ");
        console.log(e);
        dispatch({
            type: AppActionTypes.ERROR,
            payload: "Can't update user details",
        });
    }
};

export const setLocalLanguage = (localLanguage: Local) => {
    return {
        type: AppActionTypes.SET_LOCAL_LANGUAGE,
        payload: localLanguage
    };
};

export const setLocalDeviceMode = (deviceMode: DeviceModes) => {
    return {
        type: AppActionTypes.SET_LOCAL_LANGUAGE,
        payload: deviceMode
    };
};


const errorInLogin = () => {
    return {
        type: AppActionTypes.ERROR,
        payload: "Error in from userActions (errorInLogin)",
    };
};


