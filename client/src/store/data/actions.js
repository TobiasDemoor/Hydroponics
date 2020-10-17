import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError
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