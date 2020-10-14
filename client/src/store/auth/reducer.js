import { loginRequest, loginSuccess, loginError } from './typeDefs'

const initialState = {
    isFetching: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case loginRequest:
            return { ...state, isFetching: true }
        case loginSuccess:
            return { ...state, isFetching: false }
        case loginError:
            return { ...state, isFetching: true, error: payload.message }
        default:
            return state
    }
}
