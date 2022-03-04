import {ShuttleActionTypes} from "../action-types/shuttleActionTypes";


export const setShuttleList = (shuttleList: any) => {
    return {
        type: ShuttleActionTypes.SET_SHUTTLE_LIST,
        payload: shuttleList
    };
};



