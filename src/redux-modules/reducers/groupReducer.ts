import {GroupActionTypes} from "../action-types/groupActionTypes";
import {Group} from "../../interfaces/Group";

export interface GroupReducer  {
    groupList: Group[]
}


const initialState: GroupReducer = {
    groupList: [],
};

const groupReducer = (state = initialState, action: { type: any; payload: any; }) : GroupReducer => {
    switch (action.type) {
        case GroupActionTypes.UPDATE_GROUP_LIST:
            return {
              ...state,
              groupList: action.payload
            };
        default:
            return {...state};
    }
};
export default groupReducer;