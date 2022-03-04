import {OwnerActionTypes} from "../action-types/ownerActionTypes";

const initialState = {
   ownerList: [],
};

const ownerReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case OwnerActionTypes.SET_OWNER_LIST:
            return {
                ...state,
                ownerList: action.payload
            };
        default:
            return state;
    }
};
export default ownerReducer;