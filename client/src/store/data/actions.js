import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError,
    valor, alarma,
    onOffRequest, onOffSuccess, onOffError,
    changesSent, changesSuccess, changesError
} from './typeDefs'

export function getRecent(id) {
    return dispatch => {
        dispatch({ type: recentRequest, payload: { id } });
        service.getRecent(id)
            .then(
                response => dispatch({ type: recentSuccess, payload: response }),
                err => dispatch({ type: recentError, error: err })
            );
    };
}

export function changeValor(id, campo, value) {
    return {
        type: valor,
        payload: { id, campo, value }
    }
}

export function changeAlarma(id) {
    return {
        type: alarma,
        payload: { id }
    }
}

export function changeOnOff(id) {
    return (dispatch, getState) => {
        const state = getState().data
        const newState = state.rows[0][id] == "on" ? "off" : "on"
        dispatch({ type: onOffRequest })
        service.changeOnOff(id, newState)
            .then(
                response => dispatch({ type: onOffSuccess }),
                err => dispatch({ type: onOffError })
            )
    }
}

export function submitChanges() {
    return (dispatch, getState) => {
        const state = getState().data
        dispatch({ type: changesSent })
        service.submitChanges(state.columns, state.id)
            .then(
                response => dispatch({ type: changesSuccess }),
                err => dispatch({ type: changesError, error: err })
            )
    }
}