import { loginRequest, loginSuccess, loginError } from './typeDefs'

const initialState = {
    isLoading: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case loginRequest:
            return { ...state, isLoading: true }
        case loginSuccess:
            return { ...state, isLoading: false }
        case loginError:
            return { ...state, isLoading: false, error: payload.message }
        default:
            return state
    }
}
