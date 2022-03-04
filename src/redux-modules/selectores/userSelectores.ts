

export namespace UserState {
    export const getAuthUser = (state: any) => {
        return state.user.auth?.isLoggedIn;
    }
}