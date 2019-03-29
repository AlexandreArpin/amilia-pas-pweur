import * as ActionTypes from "../actionTypes";
import { delay, takeEvery } from "redux-saga/effects";

function* setCounter(payload) {
    // Does nothing but could do async network or dispatch another action,
    // totally just a middleware.
    yield delay(1000);
}

export default function* simpleSagas() {
    yield takeEvery(ActionTypes.SET_COUNTER, setCounter);
}