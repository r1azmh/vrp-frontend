import {apiRoutes} from "../components/constants";
import {apiGet, apiPost} from "./apiManager";

export async function createJob(data) {
    await apiPost(apiRoutes.postJob, data)
}

export async function getWork(title) {
    const data = await apiGet(apiRoutes.getWork(title))
    const res = []
    if (data?.data){
        for (let work of data?.data){
            res.push({value:work?.id, label:work?.name})
        }
    }
    return res
}