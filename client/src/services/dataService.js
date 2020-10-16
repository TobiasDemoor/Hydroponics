"use strict";

import handleResponse from "./responseService";

async function getRecent() {
    const requestOptions = {
        method: 'GET'
    };
    console.debug(requestOptions);

    return fetch("/api/data/recent", requestOptions).then(handleResponse);
}

export default {
    getRecent
}