import {
    recentRequest, recentSuccess, recentError,
    alarma, valor
} from './typeDefs'

const initialState = {
    isFetching: false,
    error: null,
    columns: null,
    rows: null,
    modified: false
}

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
        case recentRequest:
            return { ...state, isFetching: true, error }

        case recentSuccess:
            return { ...state, isFetching: false, ...payload, modified: false, error }

        case recentError:
            return { ...state, isFetching: false, error }

        case alarma:
            return {
                ...state, modified: true,
                columns: state.columns.map(column => {
                    if (column.id === payload.id) {
                        const newColumn = column
                        newColumn.alarma = !column.alarma
                        return newColumn
                    } else {
                        return column
                    }
                })
            }

        case valor:
            const { id, value, campo } = payload
            return {
                ...state, modified: true,
                columns: state.columns.map(column => {
                    if (column.id === id) {
                        const newColumn = column
                        newColumn[campo] = value
                        return newColumn
                    } else {
                        return column
                    }
                })
            }

        default:
            return state
    }
}
