import axios from "axios";
import { API_URLS } from "../../api/api";
import { Group } from "../../interfaces/Group";
import {GroupActionTypes} from "../action-types/groupActionTypes";


export const updateGroupList = (groupList: Group[] ) => {
    return {
        type: GroupActionTypes.UPDATE_GROUP_LIST,
        payload: groupList
    };
};



export const addGroup =
  (group: Group, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    debugger
    let response;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.GROUPS}`;
      response = await axios.post(url, group, { headers });
      if (response.status === 200) {
        dispatch({
          type: GroupActionTypes.ADD_GROUP,
          payload: response.data,
        });
      } else {
        throw new Error("Server said: invalid input");
      }
    } catch (e) {
      console.error(
        "Error from groupActions action: addGroup "
      );
      console.error(e);

      dispatch({
        type: GroupActionTypes.ERROR,
        payload: "Can't add new group",
      });
      throw new Error("Server said: invalid input");
    }
  };

  export const editGroup =
  (group: Group, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    let response;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.GROUPS}`;
      response = await axios.put(url, group, { headers });
      if (response.status === 200) {
        dispatch({
          type: GroupActionTypes.EDIT_GROUP,
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
        type: GroupActionTypes.ERROR,
        payload: "Can't add new group",
      });
      throw new Error("Server said: invalid input");
    }
  };

  export const deleteGroup =
  (id: any, token: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const url = `${API_URLS.BASE_URL}/${API_URLS.GROUPS}/${id}`;
      debugger;
      const response = await axios.delete(url, { headers });
      if (response.status === 200) {
        dispatch({
          type: GroupActionTypes.DELETE_GROUP,
          payload: response.data,
        });
      } else {
        throw new Error("Server said: cannot delete group");
      }
    } catch (e) {
      console.error(
        "Error from groupActions action: cannot delete event owner "
      );
      console.error(e);
      dispatch({
        type: GroupActionTypes.ERROR,
        payload: "Can't delete  event owner",
      });
      throw new Error("Server said: invalid input");
    }
  };