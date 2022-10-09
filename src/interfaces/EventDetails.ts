export interface EventDetails {
    eventName: string;
    eventType: EventTypes.WEDDING | EventTypes.PRIVATE_EVENT | string;
    eventDate?: string;
    eventLocation?: { locationName: string | undefined, locationLink: string | undefined }
}


export enum EventTypes {
    WEDDING = "wedding",
    PRIVATE_EVENT = "private_event"
}

