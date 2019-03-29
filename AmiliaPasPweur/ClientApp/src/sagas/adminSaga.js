import * as ActionTypes from "../actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";

function* fetchAdminData() {
    const response = yield call(fetch, 'api/admin');
    const data = yield call([response, response.json])

    yield put({
        type: ActionTypes.FETCH_ADMIN_DATA_SUCCESS,
        payload: {
            result: data
        }
    })
}


export default function* adminSagas() {
    yield takeEvery(ActionTypes.FETCH_ADMIN_DATA, fetchAdminData);
}