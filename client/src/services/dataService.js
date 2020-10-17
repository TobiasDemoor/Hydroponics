import handleResponse from "./responseService";

async function getRecent(id) {
    const requestOptions = {
        method: 'GET'
    };
    console.debug(requestOptions);

    return fetch(`/api/data/recent/${id}`, requestOptions).then(handleResponse);
}

export default {
    getRecent
}