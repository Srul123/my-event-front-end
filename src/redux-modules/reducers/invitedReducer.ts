import {InvitedActionTypes} from "../action-types/invitedActionTypes";
import {InvitedGuest} from "../../interfaces/InvitedGuest";

export interface InvitedReducer  {
    invitedGuestList: InvitedGuest[]
}


const initialState: InvitedReducer = {
    invitedGuestList: [],
};

const invitedGuestReducer = (state = initialState, action: { type: any; payload: any; }) : InvitedReducer => {
    switch (action.type) {
        case InvitedActionTypes.UPDATE_INVITED_LIST:
            return {
                ...state,
                invitedGuestList: action.payload
            };
        default:
            return state;
    }
};
export default invitedGuestReducer;