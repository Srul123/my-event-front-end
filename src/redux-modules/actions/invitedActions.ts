import {UserActionTypes} from "../action-types/userActionTypes";
import {InvitedActionTypes} from "../action-types/invitedActionTypes";
import { InvitedInterface } from "../../types/Invited";

export const setInvitedList = (invitedList: InvitedInterface[] | undefined) => {
    return {
        type: InvitedActionTypes.SET_INVITED_LIST,
        payload: invitedList
    };
};

export const logoutUser = () => {
    return {
        type: UserActionTypes.LOGOUT
    };
};



