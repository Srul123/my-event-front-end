import {RootState} from "../reducers";

export namespace StateSelectors {
        export const application = (state: RootState) => state.application;
        export const eventDetails = (state: RootState) => state.eventDetails;
}

