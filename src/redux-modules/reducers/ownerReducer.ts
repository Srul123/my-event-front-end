import { OwnerActionTypes } from "../action-types/ownerActionTypes";
import { EventOwner } from "../../interfaces/EventOwner";

export interface OwnerReducer {
  eventOwnerList: EventOwner[];
}

const initialState: OwnerReducer = {
  eventOwnerList: [],
};

const ownerReducer = (
  state = initialState,
  action: { type: string; payload: any }
): OwnerReducer => {
  switch (action.type) {
    case OwnerActionTypes.UPDATE_OWNER_LIST:
      return {
        eventOwnerList: action.payload,
      };
    case OwnerActionTypes.ADD_OWNER:
      return {
        ...state,
        eventOwnerList: [...state.eventOwnerList, action.payload],
      };
    case OwnerActionTypes.EDIT_OWNER:
      const eventOwnerListUpdated = state.eventOwnerList.map((invitedOwner) => {
        if (invitedOwner._id === action.payload._id) {
          invitedOwner = action.payload;
        }
        return invitedOwner;
      });
      return {
        ...state,
        eventOwnerList: eventOwnerListUpdated,
      };
    case OwnerActionTypes.DELETE_OWNER:
      const eventOwnerListDeleted = state.eventOwnerList.filter((invitedOwner) => {
        return invitedOwner._id !== action.payload._id;
      });
      return {
        ...state,
        eventOwnerList: eventOwnerListDeleted,
      };
    default:
      return { ...state };
  }
};

export default ownerReducer;
