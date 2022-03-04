import {TagActionTypes} from "../action-types/tagActionTypes";


export const setTagList = (tagList: any) => {
    return {
        type: TagActionTypes.SET_TAG_LIST,
        payload: tagList
    };
};



