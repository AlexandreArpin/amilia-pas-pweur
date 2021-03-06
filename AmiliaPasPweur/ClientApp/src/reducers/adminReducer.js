import * as ActionTypes from "../actionTypes";

const initialState = {
    isFetched: false,
    queries: [],
    notifications: [],
    locations: []
};

export default function sweatReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_ADMIN_DATA_SUCCESS:
            return { ...state, queries: action.payload.result.queries, notifications: action.payload.result.notifications, isFetched: true};
        case ActionTypes.FETCH_ACTIVITY_LOCATIONS_SUCCESS:
            return { ...state, locations: action.payload.results };
        default:
          return state
      }
}
