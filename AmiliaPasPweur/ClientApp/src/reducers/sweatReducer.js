import * as ActionTypes from "../actionTypes";

const initialState = {
    isLoading: false,
    query: {
        sport: "",
        location: ""
    },
    results: [],
    step: 0,
};

export default function sweatReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SEND_QUERY:
            return { ...state, sport: action.payload.sport, location: action.payload.location, isLoading: true};
        case ActionTypes.SEND_QUERY_COMPLETED:
            return { ...state, isLoading: false};
        default:
          return state
      }
}
