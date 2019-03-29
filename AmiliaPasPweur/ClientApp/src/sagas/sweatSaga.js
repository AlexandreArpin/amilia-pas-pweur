import * as ActionTypes from "../actionTypes";
import { put, delay, takeEvery } from "redux-saga/effects";

function* sendQuery(action) {
    const { sport, location } = action.payload;
    
    yield delay(1500);

    yield put({
        type: ActionTypes.SEND_QUERY_FAIL,
        payload: {
            results: []
        }
    })
}

function* notifyMe(action) {
    const { sport, location, email } = action.payload;
    
    yield delay(1500);

    yield put({
        type: ActionTypes.NOTIFY_ME_SUCCESS
    })
}

export default function* sweatSagas() {
    yield takeEvery(ActionTypes.SEND_QUERY, sendQuery);
    yield takeEvery(ActionTypes.NOTIFY_ME, notifyMe);
}