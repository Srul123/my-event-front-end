import axios from "axios";
import {UserActionTypes} from "../action-types/userActionTypes";
import {API_URLS} from "../../api/api";
import {UserPersonalDetailsInterface} from "../../types/User";



export const loginUser = (personalDetails: UserPersonalDetailsInterface | undefined) => {
    return {
        type: UserActionTypes.LOGIN,
        payload: personalDetails,
    };
};

export const logoutUser = () => {
    return {
        type: UserActionTypes.LOGOUT
    };
};

export const updateUserDetails = (user: any) => async (dispatch: (arg0: { type: any; payload: any; }) => void) => {
    let response;
    try {
        const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}/${user.id}`;
        response = await axios.put(url, user);
        dispatch({
            type: UserActionTypes.UPDATE_USER,
            payload: response.data
        });
    } catch (e) {
        console.log("Error from user action: updateUserDetails ");
        console.log(e);
        dispatch({
            type: UserActionTypes.ERROR,
            payload: "Can't update user details",
        });
    }
};

const errorInLogin = () => {
    return {
        type: UserActionTypes.ERROR,
        payload: "Error in from userActions (errorInLogin)",
    };
};


