import {LocalesActionTypes} from "../action-types/localActionTypes";
import {LanguageInterface} from "../../types/Locales";


export const setLocalLanguage = (localLanguage: LanguageInterface) => {
    return {
        type: LocalesActionTypes.SET_LOCAL_LANGUAGE,
        payload: localLanguage
    };
};



