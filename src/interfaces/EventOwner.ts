export interface EventOwner {
    id?: number;
    name: string;
    isAdmin: boolean;
    role: EventOwnerRoles.GROOM | EventOwnerRoles.BRIDE;
}

export enum EventOwnerRoles {
    GROOM = "groom",
    BRIDE = "bride"
}


