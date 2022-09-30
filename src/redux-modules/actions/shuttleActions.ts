import {ShuttleActionTypes} from "../action-types/shuttleActionTypes";
import {Shuttle} from "../../interfaces/Shuttle";


export const updateShuttleList = (shuttleList: Shuttle[]) => {
    return {
        type: ShuttleActionTypes.UPDATE_SHUTTLE_LIST,
        payload: shuttleList
    };
};



