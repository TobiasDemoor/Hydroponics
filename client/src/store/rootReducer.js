import { combineReducers } from 'redux';
import auth from './auth/reducer'
import data from './data/reducer'

const rootReducer = combineReducers({
    auth, data
});

export default rootReducer;