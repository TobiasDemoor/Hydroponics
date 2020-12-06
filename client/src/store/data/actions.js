import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError,
    valor, alarm,
    changesSent, changesSuccess, changesError,
    onOffRequest, onOffSuccess, onOffSuccessGeneral, onOffError, 
    updateRequest, updateSuccess, updateError
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
        type: alarm,
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

const { on, off } = require('../../config').constants.actuator

export function changeOnOff(idActuator) {
    return (dispatch, getState) => {
        const state = getState().data
        const newState = state.rows[0][idActuator] === on ? off : on
        const { id } = state
        dispatch({ type: onOffRequest })
        service.changeOnOff(id, idActuator, newState)
            .then(
                response => dispatch({ type: onOffSuccess, payload: response }),
                err => dispatch({ type: onOffError, error: err })
            )
    }
}

export function changeOnOffGeneral(idActuator) {
    return (dispatch, getState) => {
        const state = getState().data
        const newState = state.sections.main.row[idActuator] === on ? off : on
        dispatch({ type: onOffRequest })
        service.changeOnOff("main", idActuator, newState)
            .then(
                response => dispatch({ type: onOffSuccessGeneral, payload: response }),
                err => dispatch({ type: onOffError, error: err })
            )
    }
}

export function update() {
    return dispatch => {
        dispatch({ type: updateRequest })
        service.update()
            .then(
                response => dispatch({ type: updateSuccess, payload: response }),
                err => dispatch({ type: updateError, error: err })
            )
    }
}

export function getSections() {
    return dispatch => {
        dispatch({ type: updateRequest })
        service.getSections()
            .then(
                response => dispatch({ type: updateSuccess, payload: response }),
                err => dispatch({ type: updateError, error: err })
            )
    }
}
