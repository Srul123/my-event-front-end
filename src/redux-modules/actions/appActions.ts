import axios from "axios";
import { AppActionTypes } from "../action-types/appActionTypes";
import { API_URLS } from "../../api/api";
import { User } from "../../interfaces/User";
import { Local } from "../../interfaces/Locales";

export const loginUser = (user: User, token: string) => {
  return {
    type: AppActionTypes.LOGIN,
    payload: { user, token },
  };
};

export const logoutUser =
  (userToken: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.LOGOUT}`;
      const response = await axios.post(url, {}, { headers });
      if (response.status === 200) {
        dispatch({
          type: AppActionTypes.LOGOUT,
          payload: null,
        });
      } else {
        throw new Error('Error Occurred while tried to logout')
      }
    } catch (e) {
      console.log("Error Occurred while tried to logout");
      dispatch({
        type: AppActionTypes.ERROR,
        payload: "Can't logout user",
      });
      throw new Error("Error Occurred while tried to logout")
    }
  };

export const updateIsAppLoading = (value: boolean) => {
  return {
    type: AppActionTypes.LOADING,
    payload: value,
  };
};

export const updateUserDetails =
  (user: any) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    let response;
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.USERS}/${user.id}`;
      response = await axios.put(url, user);
      if (response.status === 200) {
        dispatch({
          type: AppActionTypes.USER,
          payload: response.data,
        });
      } else {
        throw new Error('"Error from user action: updateUserDetails"')
      }
    } catch (e) {
      console.log("Error from user action: updateUserDetails ");
      console.log(e);
      dispatch({
        type: AppActionTypes.ERROR,
        payload: "Can't update user details",
      });
      throw new Error('"Error from user action: updateUserDetails"')
    }
  };

export const setLocalLanguage = (localLanguage: Local) => {
  return {
    type: AppActionTypes.LOCAL_LANGUAGE,
    payload: localLanguage,
  };
};
