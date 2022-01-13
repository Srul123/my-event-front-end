export interface EventOwnerInterface {
    id: number;
    name: string;
    type: string;
    isAdmin: boolean;
}

export class EventOwner implements EventOwnerInterface {
    id: number;
    name: string;
    isAdmin: boolean;
    type: string;

    constructor(id: number, name: string, isAdmin: boolean, type: string) {
        this.id = id;
        this.name = name;
        this.isAdmin = isAdmin;
        this.type = type;
    }
}