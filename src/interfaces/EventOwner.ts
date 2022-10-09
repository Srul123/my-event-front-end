export interface EventOwner {
    _id?: string;
    name: string;
    isAdmin: boolean;
    role: EventOwnerRoles.GROOM | EventOwnerRoles.BRIDE;
}

export enum EventOwnerFields {
    _id = "_id",
    name = "name",
    isAdmin = "isAdmin",
    role = "role",
}

export enum EventOwnerRoles {
    GROOM = "groom",
    BRIDE = "bride"
}


