import {
    loginRequest, loginSuccess, loginError,
    modifyLoginRequest, modifyLoginSuccess, modifyLoginError,
    modifyLoginClear
} from './typeDefs'


const initialState = {
    message: null,
    isFetching: false,
    error: null
}

export default function reducer(state = initialState, { type, payload, error }) {
    switch (type) {
        case loginRequest:
            return { ...state, isFetching: true, error }
        case loginSuccess:
            return { ...state, isFetching: false, error }
        case loginError:
            return { ...state, isFetching: false, error }
        case modifyLoginRequest:
            return { ...state, isFetching: true, error }
        case modifyLoginSuccess:
            return { ...state, isFetching: false, ...payload, error }
        case modifyLoginError:
            return { ...state, isFetching: false, error }
        case modifyLoginClear:
            return {...state, message: null, error}
        default:
            return state
    }
}
