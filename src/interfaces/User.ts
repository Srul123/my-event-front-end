import {EventOwner} from "./EventOwner";
import {EventDetails} from "./EventDetails";
import {Group} from "./Group";
import {InvitedGuest} from "./InvitedGuest";
import {Shuttle} from "./Shuttle";
import {Tag} from "./Tag";

export interface UserRegistrationRequestDTO {
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

export interface UserLoginRequestDTO {
    email: string;
    password: string;
}

export interface UserLoginResponseDTO {
    user: User;
    eventDetails: EventDetails;
    eventOwners: EventOwner[];
    groups: Group[];
    invitedGuests: InvitedGuest[];
    shuttles: Shuttle[];
    tags: Tag[];
    token: string
}











