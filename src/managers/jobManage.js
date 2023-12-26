import {apiRoutes} from "../components/constants";
import {apiDelete, apiGet, apiPost} from "./apiManager";

export async function createJob(data) {
    await apiPost(apiRoutes.postJob, data)
}

export async function createMultiJob(data) {
    await apiPost(apiRoutes.postMultiJob, data)
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
export async function getJob(title) {
    const data = await apiGet(apiRoutes.getJobs(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}


export async function deleteJob(id) {
    await apiDelete(apiRoutes.deleteJob(id))
}
