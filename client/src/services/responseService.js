function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // remuevo cookie
                document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export default handleResponse;
