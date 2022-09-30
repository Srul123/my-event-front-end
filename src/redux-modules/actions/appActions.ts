import axios from "axios";
import {AppActionTypes} from "../action-types/appActionTypes";
import {API_URLS} from "../../api/api";
import {User} from "../../interfaces/User";
import {DeviceModes, Local} from "../../interfaces/Locales";


export const loginUser = (user: User | undefined, token: string) => {
    return {
        type: AppActionTypes.LOGIN,
        payload: {user, token}
    };
};

export const logoutUser = () => {
    return {
        type: AppActionTypes.LOGOUT
    };
};

export const updateIsAppLoading = (value: boolean) => {
    return {
        type: AppActionTypes.LOADING,
        payload: value,
    };
}


export const updateUserDetails = (user: any) => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    let response;
    try {
        const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}/${user.id}`;
        response = await axios.put(url, user);
        dispatch({
            type: AppActionTypes.USER,
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
        type: AppActionTypes.LOCAL_LANGUAGE,
        payload: localLanguage
    };
};




