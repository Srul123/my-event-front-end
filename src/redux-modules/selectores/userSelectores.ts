import {ModuleReducers} from "../reducers";


export namespace UserState {
    export const getAuthUser = (state: ModuleReducers) => state.user.auth?.isLoggedIn;
}