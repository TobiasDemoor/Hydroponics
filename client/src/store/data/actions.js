import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError,
    alarma, valor
} from './typeDefs'

export function getRecent(id) {
    return dispatch => {
        dispatch({ type: recentRequest });
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
        payload: {id}
    }
}

export function changeValor(id, campo, value) {
    return {
        type: valor,
        payload: {id, campo, value}        
    }
}