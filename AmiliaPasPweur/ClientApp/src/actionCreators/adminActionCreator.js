import * as ActionTypes from "../actionTypes";

export function fetchAdminData() {
    return {
        type: ActionTypes.FETCH_ADMIN_DATA
    };
}

export function fetchActivityLocations(sport, location) {
    return {
        type: ActionTypes.FETCH_ACTIVITY_LOCATIONS,
        payload: {
            sport: sport,
            location: location,
        }
    };
}