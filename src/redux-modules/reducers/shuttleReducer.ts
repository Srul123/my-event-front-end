import {ShuttleActionTypes} from "../action-types/shuttleActionTypes";
import {Shuttle} from "../../interfaces/Shuttle";

export interface ShuttleReducer {
    shuttleList: Shuttle[]
}

const initialState: ShuttleReducer = {
    shuttleList: [],
};

const shuttleReducer = (state = initialState, action: { type: any; payload: any; }): ShuttleReducer => {
    switch (action.type) {
        case ShuttleActionTypes.UPDATE_SHUTTLE_LIST:
            return {
                ...state,
                shuttleList: action.payload
            };
        default:
            return {...state};
    }
};
export default shuttleReducer;