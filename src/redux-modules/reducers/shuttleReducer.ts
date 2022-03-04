import {ShuttleActionTypes} from "../action-types/shuttleActionTypes";

const initialState = {
    shuttleList: [],
};

const shuttleReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case ShuttleActionTypes.SET_SHUTTLE_LIST:
            return {
                ...state,
                shuttleList: action.payload
            };
        default:
            return state;
    }
};
export default shuttleReducer;