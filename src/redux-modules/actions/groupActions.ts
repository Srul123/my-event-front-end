import { GroupInterface } from "../../types/Group";
import {GroupActionTypes} from "../action-types/groupActionTypes";


export const setGroupList = (groupList: GroupInterface[] | undefined) => {
    return {
        type: GroupActionTypes.SET_GROUP_LIST,
        payload: groupList
    };
};



