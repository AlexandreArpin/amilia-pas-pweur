import { combineReducers } from 'redux';
import simple from './simpleReducer';
import sweat from './sweatReducer';

export default combineReducers({
 simple,
 sweat
});