import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from "redux-saga";
import simpleSaga from "./sagas/simpleSaga";

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(simpleSaga);

    return store;
}