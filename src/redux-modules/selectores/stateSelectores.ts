
export namespace UserState {
    export const getAuthUser = (state: any) => {
        return state.user.auth?.isLoggedIn;
    }
}

export namespace LocalesState {
    export const getCurrentLanguage = (state: any) => {
        return state.local;
    }
}