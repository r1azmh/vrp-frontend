import axios from "axios";
import {apiRoutes} from "../components/constants";

export async function apiPost(url, data) {
    try {
        await axios.post(url, data)
            .then((response) => {
                console.log(response);
            });
    } catch (e) {

    }
}


export async function apiGet(url, params) {
    try {
        return await axios.get(url)
    } catch (e) {

    }
}

