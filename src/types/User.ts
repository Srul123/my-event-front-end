import {EventOwnerInterface} from "./EventOwner";
import {InvitedInterface} from "./Invited";
import {GroupInterface} from "./Group";
import {EventTagInterface as EventTag} from "./EventTagClassify";
import {EventTableInterface, tableDefaultSize} from "./EventTable";
import {UserEventDetails} from "./UserEventDetails";

export interface UserInterface {
    id?: number;
    userDetails?: UserDetailsInterface;
    auth?: UserAuthInterface;
    data?: {
        eventDetails: UserEventDetails,
        eventInvitedManagement: UserEventInvitedManagementInterface,
        eventSeatingArrangement: {
            tableDefaultSize: number,
            tableList: EventTableInterface[]
        }
    };
}

export interface UserDetailsInterface {
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


export interface UserEventInvitedManagementInterface {
    invitedList: InvitedInterface[],
    eventOwnerList: EventOwnerInterface[],
    groupList: GroupInterface[],
    eventTagList: EventTag[]
}

export interface UserEventSeatingArrangementInterface {
    tableDefaultSize: number,
    tableList: EventTableInterface[]
}


export class User {
    userDetails: UserDetailsInterface;
    data: {
        eventDetails: UserEventDetails;
        eventInvitedManagement: UserEventInvitedManagementInterface;
        eventSeatingArrangement: UserEventSeatingArrangementInterface;
    };

    constructor(userDetails: UserDetailsInterface, eventDetails: UserEventDetails) {
        this.userDetails = userDetails;
        this.data = {
            eventDetails: eventDetails,
            eventInvitedManagement: {
                invitedList: [],
                eventOwnerList: [],
                groupList: [],
                eventTagList: []
            },
            eventSeatingArrangement: {
                tableDefaultSize: tableDefaultSize,
                tableList: []
            }
        }
    }

    id?: number | undefined;
    auth?: UserAuthInterface | undefined;

    setEventOwnerList(list: EventOwnerInterface[]): void {
        this.data.eventInvitedManagement.eventOwnerList = list;
    }
}







