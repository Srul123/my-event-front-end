export interface EventOwner {
    _id?: string;
    name: string;
    isAdmin?: boolean;
}

export enum EventOwnerFields {
    _id = "_id",
    name = "name",
    isAdmin = "isAdmin",
}




