import {FilterActionTypes} from "../action-types/filterActionTypes";


export const setInvitedFilterList = (list: string) => {
    return {
        type: FilterActionTypes.SET_FILTER_INVITED_LIST,
        payload: list
    };
};



