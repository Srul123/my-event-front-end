import {InvitedActionTypes} from "../action-types/invitedActionTypes";
import {InvitedGuest} from "../../interfaces/InvitedGuest";

export const updateInvitedGuestList = (invitedList: InvitedGuest[] ) => {
    return {
        type: InvitedActionTypes.UPDATE_INVITED_LIST,
        payload: invitedList
    };
};





