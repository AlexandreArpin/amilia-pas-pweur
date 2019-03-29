import * as ActionTypes from "../actionTypes";

const initialState = {
    count: 0, 
};

export default function simpleReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_COUNTER:
            return { ...state, count: action.payload.count };
        default:
          return state
      }
}
