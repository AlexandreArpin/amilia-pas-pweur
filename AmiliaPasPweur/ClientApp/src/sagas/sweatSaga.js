import * as ActionTypes from "../actionTypes";

import { call, put, takeEvery } from "redux-saga/effects";

function* fetchAvailableSports() {
    const response = yield call(fetch, 'api/keywords');
    const data = yield call([response, response.json])

    yield put({
        type: ActionTypes.FETCH_SPORTS_SUCCESS,
        payload: {
            results: data
        }
    })
}


function* sendQuery(action) {
    const { sport, location } = action.payload;
    
    const response = yield call(fetch, `api/locations?keywordId=${sport}&lat=${location.lat}&lng=${location.lng}`);
    const data = yield call([response, response.json])

    console.debug("Send Query Result", data);

    if(data.length > 0) {
        yield put({
            type: ActionTypes.SEND_QUERY_SUCCESS,
            payload: {
                results: data
            }
        })
    }
    else {
        yield put({
            type: ActionTypes.SEND_QUERY_FAIL,
            payload: {
                results: []
            }
        })
    }
}

function* notifyMe(action) {
    const { sport, location, email } = action.payload;
    yield call(fetch, `api/notify-me`, {
        method: 'POST',
        headers : {
            'Content-Type' :'application/json'
          },
          body: JSON.stringify({
              keywordId: sport,
              lat: location.lat,
              lng: location.lng,
              email: email,
          })
      });

    yield put({
        type: ActionTypes.NOTIFY_ME_SUCCESS
    })
}

export default function* sweatSagas() {
    yield takeEvery(ActionTypes.SEND_QUERY, sendQuery);
    yield takeEvery(ActionTypes.FETCH_SPORTS, fetchAvailableSports);
    yield takeEvery(ActionTypes.NOTIFY_ME, notifyMe);
}