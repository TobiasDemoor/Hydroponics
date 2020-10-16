import {
    recentRequest, recentSuccess, recentError
} from './typeDefs'

const initialState = {
    columns: null,
    rows: null
}

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
        case recentRequest:
            return { ...state, isFetching: true, error }
        case recentSuccess:
            return { ...state, isFetching: false, ...payload, error }
        case recentError:
            return { ...state, isFetching: false, error }
        default:
            return state
    }
}
