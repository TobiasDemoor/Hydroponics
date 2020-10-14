import {
    loginRequest, loginSuccess, loginError,
    modifyLoginRequest, modifyLoginSuccess, modifyLoginError
} from './typeDefs'

const initialState = {
    isFetching: false,
    error: null
}

export default (state = initialState, { type, payload, error }) => {
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
        default:
            return state
    }
}
