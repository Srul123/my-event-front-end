import {LocalInterface} from "../../types/Locales";

export namespace UserState {
    export const getAuthUser = (state: any) => {
        return state.user.auth?.isLoggedIn;
    }
}

export namespace LocalesState {
    export const getCurrentLocal = (state: any) : LocalInterface => {
        return state.local;
    }
}