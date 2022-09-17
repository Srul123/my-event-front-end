import {InvitedActionTypes} from "../action-types/invitedActionTypes";
import {Invited} from "../../interfaces/Invited";

export const setInvitedList = (invitedList: Invited[] | undefined) => {
    return {
        type: InvitedActionTypes.SET_INVITED_LIST,
        payload: invitedList
    };
};





