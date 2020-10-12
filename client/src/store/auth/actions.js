import service from '../../services/authService'

export function login(username, password) {
    return (dispatch, getState) => {
        // dispatch({});

        service.login(username, password)
            .then(
                (response) => {
                    // const { token, exp } = response.token;
                    // document.cookie = `token=${token};expires=${new Date(exp)};path=/`
                    // const payload = { ...response };
                    // payload.isLoggedIn = userToken != null;
                    // dispatch({type:});
                }
                // err => dispatch({type: "HOla"}),
            );
    };
}