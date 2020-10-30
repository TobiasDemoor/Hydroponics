import service from '../../services/authService'
import {
    loginRequest, loginSuccess, loginError,
    modifyLoginRequest, modifyLoginSuccess, modifyLoginError,
    modifyLoginClear
} from './typeDefs'

export function login(username, password) {
    return dispatch => {
        dispatch({ type: loginRequest });
        service.login(username, password)
            .then(
                () => dispatch({ type: loginSuccess }),
                err => dispatch({ type: loginError, error: err })
            );
    };
}


export function modifyLogin(currentUsername, currentPassword, newUsername, newPassword) {
    return dispatch => {
        dispatch({ type: modifyLoginRequest });
        service.modifyLogin(currentUsername, currentPassword, newUsername, newPassword)
            .then(
                response => dispatch({ type: modifyLoginSuccess, payload: response }),
                err => dispatch({ type: modifyLoginError, error: err })
            )
    }
}

export const clearModifyLogin = {type: modifyLoginClear}