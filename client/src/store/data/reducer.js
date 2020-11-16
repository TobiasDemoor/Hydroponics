import {
    recentRequest, recentSuccess, recentError,
    valor, alarma,
    changesSent, changesSuccess, changesError,
    onOffRequest, onOffSuccess, onOffSuccessGeneral, onOffError, 
    updateRequest, updateSuccess, updateError
} from './typeDefs'

const initialState = {
    id: null,
    error: null,

    sections: null,

    isFetching: false,
    columns: null,
    rows: null,

    isPushing: false,
    modified: false,

    executing: false,
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

        case changesSent:
            return { ...state, isPushing: true, error }

        case changesSuccess:
            return { ...state, isPushing: false, modified: false, error }

        case changesError:
            return { ...state, isPushing: false, error }

        case onOffRequest:
            return { ...state, executing: true, error }

        case onOffSuccess:
            const newRows = state.rows.map(row => { return { ...row } })
            newRows.unshift(payload.row)
            return { ...state, rows: newRows, executing: false, error }

        case onOffSuccessGeneral:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    general: {
                        ...state.sections.general,
                        row: payload.row
                    }
                },
                executing: false,
                error
            }

        case onOffError:
            return { ...state, executing: false, error }

        case updateRequest:
            return { ...state, isFetching: true, error }

        case updateSuccess:
            return { ...state, isFetching: false, ...payload, error }

        case updateError:
            return { ...state, isFetching: false, error }

        default:
            return state
    }
}
