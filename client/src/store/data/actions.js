import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError,
    valor, alarma,
    changesSent, changesSuccess, changesError,
    onOffRequest, onOffSuccess, onOffError
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

export function submitChanges() {
    return (dispatch, getState) => {
        const state = getState().data
        dispatch({ type: changesSent })
        service.submitChanges(state.columns, state.id)
            .then(
                () => dispatch({ type: changesSuccess }),
                err => dispatch({ type: changesError, error: err })
            )
    }
}

const actuator = require('../../config').constants.actuator

export function changeOnOff(idActuator) {
    return (dispatch, getState) => {
        const state = getState().data
        const newState = state.rows[0][idActuator] === actuator.on ? actuator.off : actuator.on
        const { id } = state
        dispatch({ type: onOffRequest })
        service.changeOnOff(id, idActuator, newState)
            .then(
                response => dispatch({ type: onOffSuccess, payload: response }),
                err => dispatch({ type: onOffError, error: err })
            )
    }
}
