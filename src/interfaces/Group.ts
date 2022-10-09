export interface Group {
  _id?: string;
  user: string;
  eventOwner: string;
  name: string;
}

export enum GroupFields {
  _id = "_id",
  user = "user",
  eventOwner = "eventOwner",
  name = "name",
}
