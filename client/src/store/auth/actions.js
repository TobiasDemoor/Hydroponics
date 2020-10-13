import service from '../../services/authService'
import {loginRequest,loginSuccess,loginError} from './typeDefs'

export function login(username, password) {
    return dispatch => {
        dispatch({type: loginRequest});
        service.login(username, password)
            .then(
                () => dispatch({type: loginSuccess}),
                err => dispatch({type: loginError, payload: err})
            );
    };
}