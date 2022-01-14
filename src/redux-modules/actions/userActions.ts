import axios from "axios";
import {UserActionTypes} from "../action-types/userActionTypes";

export const loginUser = (user: any) => {
    if (!user) {
        errorInLogin();
    }
    return {
        type: UserActionTypes.LOGIN,
        payload: user,
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
        response = await axios.put(`localhost/users/${user.id}`, user);
        dispatch({
            type: UserActionTypes.UPDATE_USER,
            payload: response.data
        });
    } catch (e) {
        console.log("Error from user action: updateUserDetails " + response);
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


