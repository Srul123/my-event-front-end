import {GroupActionTypes} from "../action-types/groupActionTypes";

const initialState = {
    groupList: [],
};

const groupReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case GroupActionTypes.SET_GROUP_LIST:
            return {
              ...state,
              groupList: action.payload
            };
        default:
            return state;
    }
};
export default groupReducer;