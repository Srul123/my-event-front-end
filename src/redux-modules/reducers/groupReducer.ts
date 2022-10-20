import { GroupActionTypes } from "../action-types/groupActionTypes";
import { Group } from "../../interfaces/Group";

export interface GroupReducer {
  groupList: Group[];
}

const initialState: GroupReducer = {
  groupList: [],
};

const groupReducer = (
  state = initialState,
  action: { type: any; payload: any }
): GroupReducer => {
  switch (action.type) {
    case GroupActionTypes.UPDATE_GROUP_LIST:
      return {
        ...state,
        groupList: action.payload,
      };
    case GroupActionTypes.ADD_GROUP:
      return {
        ...state,
        groupList: [...state.groupList, action.payload],
      };
      case GroupActionTypes.EDIT_GROUP:
        const groupListUpdated = state.groupList.map((group) => {
          if (group._id === action.payload._id) {
            group = action.payload;
          }
          return group;
        });
        return {
          ...state,
          groupList: groupListUpdated,
        };
    case GroupActionTypes.DELETE_GROUP:
      const groupListDeleted = state.groupList.filter(
        (invitedOwner) => {
          return invitedOwner._id !== action.payload._id;
        }
      );
      return {
        ...state,
        groupList: groupListDeleted,
      };
    default:
      return { ...state };
  }
};
export default groupReducer;
