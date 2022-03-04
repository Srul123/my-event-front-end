import {InvitedActionTypes} from "../action-types/invitedActionTypes";

const initialState = {
    invitedList: [],
};

const invitedReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case InvitedActionTypes.SET_INVITED_LIST:
            return {
                ...state,
                invitedList: action.payload
            };
        default:
            return state;
    }
};
export default invitedReducer;