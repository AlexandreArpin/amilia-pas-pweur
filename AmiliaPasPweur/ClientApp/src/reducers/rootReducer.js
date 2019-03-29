import { combineReducers } from 'redux';
import simple from './simpleReducer';
import sweat from './sweatReducer';
import admin from './adminReducer';

export default combineReducers({
 simple,
 sweat,
 admin
});