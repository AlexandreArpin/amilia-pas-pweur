import * as ActionTypes from "../actionTypes";

// Steps:
// 0 = Query
// 1 = Results
// 2 = NotifyMe
const initialState = {
    isLoading: false,
    availableSports: {
        isFetched: false,
        sports:[]
    },
    query: {
        sport: "",
        location: ""
    },
    notify: {
        email: "",
        success: false,
    },
    results: [],
    step: 0,
};

export default function sweatReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_SPORTS_SUCCESS:
            return { ...state, availableSports: { isFetched: true, sports: action.payload.results}};
        case ActionTypes.SEND_QUERY:
            return { ...state, query: { ...state.query, sport: action.payload.sport, location: action.payload.location} , isLoading: true};
        case ActionTypes.SEND_QUERY_SUCCESS:
            return { ...state, results: action.payload.results, step: 1, isLoading: false};
        case ActionTypes.SEND_QUERY_FAIL:
            return { ...state, step: 2, isLoading: false};
        case ActionTypes.NOTIFY_ME_SUCCESS:
            return { ...state, notify: { success: true }};
        case ActionTypes.RESET:
            return initialState;
        default:
          return state
      }
}
