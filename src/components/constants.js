const apiBaseUrl = "http://localhost:8000"

export const JOBS = {
    Dashboard: 1,
    Work: 2,
    Job: 3,
    Fleet: 4,
    VehicleProfile: 5
}

export const apiRoutes = {
    postJob: `${apiBaseUrl}/job-create/`,
    deleteJob: (id)=>`${apiBaseUrl}/job-delete/${id}/`,
    postMultiJob: `${apiBaseUrl}/multijob-create/`,
    getWork:(name='')=> `${apiBaseUrl}/works/?name=${name}`,
    createWork: `${apiBaseUrl}/work-create/`,
    deleteWork:(id)=> `${apiBaseUrl}/work_delete/${id}/`,
    getJobs:(name='')=> `${apiBaseUrl}/jobs/?name=${name}`,
    getVehicles:(name='')=> `${apiBaseUrl}/vehicles/?name=${name}`,
    getVehicleProfiles:(name='')=> `${apiBaseUrl}/vehicle-profiles/?name=${name}`,
    createVehicleProfile: `${apiBaseUrl}/vehicle-profile-create/`,
    deleteVehicleProfile:(id)=> `${apiBaseUrl}/vehicle-profile-delete/${id}/`,
    deleteVehicle:(id)=> `${apiBaseUrl}/vehicle-delete/${id}/`,
    createVehicle:`${apiBaseUrl}/vehicle-create/`,
}