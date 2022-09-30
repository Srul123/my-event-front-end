import {OwnerActionTypes} from "../action-types/ownerActionTypes";
import {EventOwner} from "../../interfaces/EventOwner";



export const updateOwnerList = (ownerList: EventOwner[]) => {
    return {
        type: OwnerActionTypes.UPDATE_OWNER_LIST,
        payload: ownerList
    };
};



