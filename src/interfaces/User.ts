import {EventOwner} from "./EventOwner";
import {EventDetails} from "./EventDetails";

export interface UserRequestDTO {
    userDetails: User;
    eventDetails: EventDetails;
    groom?: EventOwner,
    bride?: EventOwner
}

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password?: string,
}











