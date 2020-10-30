import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import data from './data/reducer'
import auth from './auth/reducer'
import view from './view'



function getStore() {
    const rootReducer = combineReducers({
        auth, data, view
    });
    return createStore(rootReducer, composeWithDevTools(
        applyMiddleware(thunk),
    ));
}

export default getStore;