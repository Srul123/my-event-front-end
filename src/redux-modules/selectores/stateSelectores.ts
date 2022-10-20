import {RootState} from "../reducers";

export namespace StateSelectors {
        export const application = (state: RootState) => state.application;
        export const eventDetails = (state: RootState) => state.eventDetails;
        export const eventOwners = (state: RootState) => state.eventOwners;
        export const groups = (state: RootState) => state.groups;
        export const invitedGuests = (state: RootState) => state.invitedGuests;
        export const tags = (state: RootState) => state.tags;
}

