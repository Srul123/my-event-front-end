import {LocalesActionTypes} from "../action-types/localActionTypes";
import {LanguageInterface} from "../../types/Locales";

const initialState: LanguageInterface = {
    code: "",
    name: "",
    countryCode: "",
    dir: "",
    side: undefined
};


const localReducer = (state = initialState, action: { type: any; payload: LanguageInterface; }) => {
    switch (action.type) {
        case LocalesActionTypes.SET_LOCAL_LANGUAGE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
export default localReducer;