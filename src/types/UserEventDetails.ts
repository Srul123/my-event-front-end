export enum EventTypes {
    WEDDING = "wedding",
    CONFERENCE = "conference",
    PRIVATE_EVENT = "privateEvent"
}

export interface UserEventDetails {
    eventName: string,
    eventType: string,
    eventDate: string,
    eventLocation: { locationName: string, locationLink: string }
}