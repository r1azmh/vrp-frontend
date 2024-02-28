import {apiRoutes} from "../components/constants";
import {apiDelete, apiGet, apiPost} from "./apiManager";

export async function createJob(data) {
    await apiPost(apiRoutes.postJob, data)
}

export async function createMultiVehicle(data) {
    await apiPost(apiRoutes.createVehicle, data)
}

export async function deleteVehicle(id) {
    return await apiDelete(apiRoutes.deleteVehicle(id))
}

export async function getVehicle(title) {
    const data = await apiGet(apiRoutes.getVehicles(title))
    const res = []
    if (data?.data){
        return data?.data
    }
    return res
}
export async function getVehicleProfile(title) {
    const data = await apiGet(apiRoutes.getVehicleProfiles(title))
    const res = []
    if (data?.data){
        for (let profile of data?.data){
            res.push({value:profile?.id, label:profile?.name})
        }
    }
    return res
}