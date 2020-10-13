import { combineReducers } from 'redux';
import * as auth from './auth/reducer'

const rootReducer = combineReducers({
    auth: auth.reducer
});

export default rootReducer;