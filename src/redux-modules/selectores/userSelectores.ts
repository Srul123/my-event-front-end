import {ModuleReducers} from "../reducers";


export namespace UserState {
    export const getAuthUser = (state: ModuleReducers) => {
        return state.user.auth?.isLoggedIn;
    }
}