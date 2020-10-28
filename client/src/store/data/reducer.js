import {
    recentRequest, recentSuccess, recentError,
    valor, alarma,
    onOffRequest, onOffSuccess, onOffError,
    changesSent, changesSuccess, changesError
} from './typeDefs'

const initialState = {
    id: null,
    isFetching: false,
    error: null,
    columns: null,
    rows: null,
    modified: false,
    isPushing: false
}

export default (state = initialState, { type, payload, error }) => {
    switch (type) {
        case recentRequest:
            return { ...state, isFetching: true, id: payload.id, error }

        case recentSuccess:
            return { ...state, isFetching: false, ...payload, modified: false, error }

        case recentError:
            return { ...state, isFetching: false, id: null, error }

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
        
        case onOffRequest:
            // TODO: remover codigo provisorio
            const newRows = [...state.rows]
            const newRow = {
                ...state.rows[0],
                [payload.id]: payload.newState
            }
            newRow.code = Object.values(newRow).join(' ')
            newRows.unshift(newRow)
            return {
                ...state, rows: newRows
            }

        case changesSent:
            return { ...state, isPushing: true, error }

        case changesSuccess:
            return { ...state, isPushing: false, modified: false, error }

        case changesError:
            return { ...state, isPushing: false, error }

        default:
            return state
    }
}
