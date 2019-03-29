import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from "redux-saga";
import simpleSaga from "./sagas/simpleSaga";
import sweatSagas from './sagas/sweatSaga';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    window.store = store;

    sagaMiddleware.run(simpleSaga);
    sagaMiddleware.run(sweatSagas);

    return store;
}