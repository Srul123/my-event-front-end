import {OwnerActionTypes} from "../action-types/ownerActionTypes";
import {EventOwner} from "../../interfaces/EventOwner";

export interface OwnerReducer  {
    eventOwnerList: EventOwner[];
}


const initialState: OwnerReducer = {
    eventOwnerList: [],
};

const ownerReducer = (state = initialState, action: { type: string; payload: any; }) : OwnerReducer => {
    switch (action.type) {
        case OwnerActionTypes.UPDATE_OWNER_LIST:
            return {
                eventOwnerList: action.payload,
            };
        default:
            return {...state};
    }
};
export default ownerReducer;