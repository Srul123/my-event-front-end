import { Tag } from "../../interfaces/Tag";
import {TagActionTypes} from "../action-types/tagActionTypes";

export interface TagReducer  {
    tagList: Tag[];
}

const initialState: TagReducer = {
    tagList: [],
};

const tagReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TagActionTypes.UPDATE_TAG_LIST:
            return {
                ...state,
                tagList: action.payload
            };
        default:
            return {...state};
    }
};
export default tagReducer;