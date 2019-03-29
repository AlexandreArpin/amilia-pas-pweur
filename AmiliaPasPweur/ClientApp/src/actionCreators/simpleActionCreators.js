import * as ActionTypes from "../actionTypes";

export function setCounter(count) {
    return {
        type: ActionTypes.SET_COUNTER,
        payload: {
            count: count
        }
    };
}