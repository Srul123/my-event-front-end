import { OwnerActionTypes } from "../action-types/ownerActionTypes";
import { EventOwner } from "../../interfaces/EventOwner";
import axios from "axios";
import { API_URLS } from "../../api/api";

export const updateOwnerList = (ownerList: EventOwner[]) => {
  return {
    type: OwnerActionTypes.UPDATE_OWNER_LIST,
    payload: ownerList,
  };
};

export const addEventInvitedGuestsOwner =
  (eventOwner: EventOwner, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    let response;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.EVENT_GUESTS_OWNER}`;
      response = await axios.post(url, eventOwner, { headers });
      if (response.status === 200) {
        dispatch({
          type: OwnerActionTypes.ADD_OWNER,
          payload: response.data,
        });
      } else {
        throw new Error("Server said: invalid input");
      }
    } catch (e) {
      console.error(
        "Error from ownerActions action: addEventInvitedGuestsOwner "
      );
      console.error(e);

      dispatch({
        type: OwnerActionTypes.ERROR,
        payload: "Can't add new event owner",
      });
      throw new Error("Server said: invalid input");
    }
  };

export const editEventInvitedGuestsOwner =
  (eventOwner: EventOwner, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    let response;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.EVENT_GUESTS_OWNER}`;
      response = await axios.put(url, eventOwner, { headers });
      if (response.status === 200) {
        dispatch({
          type: OwnerActionTypes.EDIT_OWNER,
          payload: response.data,
        });
      } else {
        throw new Error("Server said: invalid input");
      }
    } catch (e) {
      console.error(
        "Error from ownerActions action: addEventInvitedGuestsOwner "
      );
      console.error(e);

      dispatch({
        type: OwnerActionTypes.ERROR,
        payload: "Can't add new event owner",
      });
      throw new Error("Server said: invalid input");
    }
  };

export const deleteEventInvitedGuestsOwner =
  (id: any, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.EVENT_GUESTS_OWNER}/${id}`;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        dispatch({
          type: OwnerActionTypes.DELETE_OWNER,
          payload: response.data,
        });
      } else {
        throw new Error("Server said: cannot delete event owner");
      }
    } catch (e) {
      console.error(
        "Error from ownerActions action: cannot delete event owner "
      );
      console.error(e);
      dispatch({
        type: OwnerActionTypes.ERROR,
        payload: "Can't delete  event owner",
      });
      throw new Error("Server said: invalid input");
    }
  };
