export interface EventDetails {
    eventName: string;
    eventType: EventTypes.WEDDING | EventTypes.PRIVATE_EVENT | "";
    eventDate?: string;
    eventLocation?: { locationName: string, locationLink: string }
}


export enum EventTypes {
    WEDDING = "wedding",
    PRIVATE_EVENT = "privateEvent"
}

