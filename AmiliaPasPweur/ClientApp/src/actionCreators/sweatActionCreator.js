import * as ActionTypes from "../actionTypes";

export function sendQuery(sport, location) {
    return {
        type: ActionTypes.SEND_QUERY,
        payload: {
            sport: sport,
            location: location
        }
    };
}

export function notifyMe(sport, location, email) {
    return {
        type: ActionTypes.NOTIFY_ME,
        payload: {
            sport: sport,
            location: location,
            email: email
        }
    };
}