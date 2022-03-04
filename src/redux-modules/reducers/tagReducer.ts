import {TagActionTypes} from "../action-types/tagActionTypes";

const initialState = {
    tagList: [],
};

const tagReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TagActionTypes.SET_TAG_LIST:
            return {
                ...state,
                tagList: action.payload
            };
        default:
            return state;
    }
};
export default tagReducer;