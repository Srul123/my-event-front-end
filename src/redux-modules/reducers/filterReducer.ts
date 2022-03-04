import {FilterActionTypes} from "../action-types/filterActionTypes";

const initialState = {
    invitedFilterList: [],
};

const filterReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case FilterActionTypes.SET_FILTER_INVITED_LIST:
            return {
                ...state,
                invitedFilterList: action.payload
            };
        default:
            return state;
    }
};
export default filterReducer;