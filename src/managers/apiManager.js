import axios from "axios";

export async function apiPost(url, data, config={}) {
    try {
        await axios.post(url, data, config)
            .then((response) => {
                console.log(response);
            });
    } catch (e) {

    }
}

export async function apiPut(url, data, config={}) {
    try {
        await axios.put(url, data, config)
            .then((response) => {
                console.log(response);
            });
    } catch (e) {

    }
}


export async function apiGet(url) {
    try {
        return await axios.get(url)
    } catch (e) {

    }
}


export async function apiDelete(url) {
    try {
        return await axios.delete(url)
    } catch (e) {

    }
}

