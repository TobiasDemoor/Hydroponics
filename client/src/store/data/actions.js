import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError,
    alarma, valor,
    changesSent, changesSuccess, changesError
} from './typeDefs'

export function getRecent(id) {
    return dispatch => {
        dispatch({ type: recentRequest, payload:{id} });
        service.getRecent(id)
            .then(
                response => dispatch({ type: recentSuccess, payload: response }),
                err => dispatch({ type: recentError, error: err })
            );
    };
}

export function changeAlarma(id) {
    return {
        type: alarma,
        payload: { id }
    }
}

export function changeValor(id, campo, value) {
    return {
        type: valor,
        payload: { id, campo, value }
    }
}

export function submitChanges() {
    return (dispatch, getState) => {
        dispatch({ type: changesSent })
        const state = getState().data
        console.log(state.columns, state.id)
        service.submitChanges(state.columns, state.id)
        .then(
            response => dispatch({ type: changesSuccess}),
            err => dispatch({ type: changesError, error: err })
        )
    }
}