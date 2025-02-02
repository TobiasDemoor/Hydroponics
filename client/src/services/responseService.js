import logOut from '../helpers/logOut'

async function handleResponse(response) {
    if (response) {
        return response.text().then(text => {
            let data;
            try {
                data = text && JSON.parse(text);
            } catch(err) {
                if (err instanceof SyntaxError) {
                    console.error("Badly formed respose");
                    console.error(text);
                }
            }
            if (!response.ok) {
                if (response.status === 401) {
                    // remuevo cookie
                    logOut()
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
        });
    } else {
        return new Promise(() => response);
    }
}

export default handleResponse;
