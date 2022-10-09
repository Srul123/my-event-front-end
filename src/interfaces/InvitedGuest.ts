
export interface InvitedGuest {
    _id: string;
    user: string;
    eventOwner: string;
    group: string;
    tags: string[];
    shuttle: string;
    name: string;
    totalGuests: number;
    phoneNumber: string;
    email: string;
    arrivalStatus: string;
    comments: string;
}

