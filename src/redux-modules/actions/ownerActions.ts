import {OwnerActionTypes} from "../action-types/ownerActionTypes";



export const setOwnerList = (ownerList: any) => {
    // test
    return {
        type: OwnerActionTypes.SET_OWNER_LIST,
        payload: ownerList
    };
};



