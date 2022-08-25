export interface EventOwnerInterface {
    id: number;
    name: string;
    isAdmin: boolean;
    role: string;
}

export class EventOwner implements EventOwnerInterface {
    id: number;
    name: string;
    isAdmin: boolean;
    role: string;

    constructor(id: number, name: string, isAdmin: boolean, role: string) {
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.role = role;
    }
}