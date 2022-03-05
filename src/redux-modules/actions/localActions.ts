import {LocalesActionTypes} from "../action-types/localActionTypes";
import {DeviceModes, LocalInterface} from "../../types/Locales";


export const setLocalLanguage = (localLanguage: LocalInterface) => {
    return {
        type: LocalesActionTypes.SET_LOCAL_LANGUAGE,
        payload: localLanguage
    };
};

export const setLocalDeviceMode = (deviceMode: DeviceModes) => {
    return {
        type: LocalesActionTypes.SET_LOCAL_LANGUAGE,
        payload: deviceMode
    };
};



