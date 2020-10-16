import service from '../../services/dataService'
import {
    recentRequest, recentSuccess, recentError
} from './typeDefs'

export function getRecent() {
    return dispatch => {
        dispatch({ type: recentRequest });
        service.getRecent()
            .then(
                response => dispatch({ type: recentSuccess, payload: response }),
                err => dispatch({ type: recentError, error: err })
            );
    };
}