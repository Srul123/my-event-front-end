import { Group } from "../../interfaces/Group";
import {GroupActionTypes} from "../action-types/groupActionTypes";


export const updateGroupList = (groupList: Group[] ) => {
    return {
        type: GroupActionTypes.UPDATE_GROUP_LIST,
        payload: groupList
    };
};



