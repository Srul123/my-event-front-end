import {LocalesActionTypes} from "../action-types/localActionTypes";
import {LocalInterface} from "../../types/Locales";

const initialState: LocalInterface = {
    code: "",
    name: "",
    countryCode: "",
    dir: "",
    side: undefined,
    device: undefined
};


const localReducer = (state = initialState, action: { type: any, payload: any }) => {
    switch (action.type) {
        case LocalesActionTypes.SET_LOCAL_LANGUAGE:
            return {
                ...state,
                ...action.payload
            };
        case LocalesActionTypes.SET_DEVICE_MODE:
            return {
                ...state,
                device: action.payload
            };
        default:
            return state;
    }
};
export default localReducer;