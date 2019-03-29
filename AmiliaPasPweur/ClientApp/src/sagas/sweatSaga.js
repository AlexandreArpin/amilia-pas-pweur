import * as ActionTypes from "../actionTypes";
import { put, delay, takeEvery } from "redux-saga/effects";

function* sendQuery(action) {
    const { sport, location } = action.payload;
    
    yield delay(2000);

    yield put({
        type: ActionTypes.SEND_QUERY_COMPLETED,
        payload: {
            success: true,
            results: []
        }
    })
}

export default function* sweatSagas() {
    yield takeEvery(ActionTypes.SEND_QUERY, sendQuery);
}