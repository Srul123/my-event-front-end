import {TagActionTypes} from "../action-types/tagActionTypes";
import {Tag} from "../../interfaces/Tag";


export const updateTagList = (tagList: Tag[]) => {
    return {
        type: TagActionTypes.UPDATE_TAG_LIST,
        payload: tagList
    };
};



