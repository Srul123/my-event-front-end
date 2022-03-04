import {OwnerActionTypes} from "../action-types/ownerActionTypes";



export const setOwnerList = (ownerList: any) => {
    return {
        type: OwnerActionTypes.SET_OWNER_LIST,
        payload: ownerList
    };
};



