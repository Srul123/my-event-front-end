import {EventOwnerInterface} from "./EventOwner";
import {InvitedInterface} from "./Invited";
import {GroupInterface} from "./Group";
import {EventTagInterface} from "./EventTagClassify";
import {ShuttleInterface} from "./Shuttle";
import {EventDetailsInterface} from "./EventDetails";

export interface UserInterface {
    id?: number;
    personalDetails?: UserPersonalDetailsInterface;
    auth?: UserAuthInterface;
    data?: {
        eventDetails: EventDetailsInterface,
        invitedList: InvitedInterface[],
        eventOwnerList: EventOwnerInterface[],
        groupList: GroupInterface[],
        shuttleList: ShuttleInterface[],
        eventTagList: EventTagInterface[],
    };
}

export interface UserPersonalDetailsInterface {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password?: string
}


interface UserAuthInterface {
    isLoggedIn: boolean,
    token?: string
}

interface UserDataInterface {
    eventDetails: EventDetailsInterface,
    invitedList: InvitedInterface[],
    eventOwnerList: EventOwnerInterface[],
    groupList: GroupInterface[],
    shuttleList: ShuttleInterface[],
    eventTagList: EventTagInterface[],
}


export class User {
    id?: number | undefined;
    auth?: UserAuthInterface | undefined;
    personalDetails: UserPersonalDetailsInterface;
    data: UserDataInterface;

    constructor(personalDetails: UserPersonalDetailsInterface, eventDetails: EventDetailsInterface) {
        this.personalDetails = personalDetails;
        this.data = {
            eventDetails: eventDetails,
            invitedList: [],
            eventOwnerList: [],
            groupList: [],
            shuttleList: [],
            eventTagList: [],
        }
    }

    setEventOwnerList(list: EventOwnerInterface[]): void {
        this.data.eventOwnerList = list;
    }
}







