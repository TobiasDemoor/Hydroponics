import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import data from './data/reducer'
import auth from './auth/reducer'



function getStore() {
    const rootReducer = combineReducers({
        auth, data
    });
    return createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunk),
    ));
}

export default getStore;