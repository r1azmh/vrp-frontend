const baseUrl = "http://localhost:5700"

export const JOBS = {
    Dashboard: 1,
    Work: 2,
    Job: 3,
    Fleet: 4
}

export const apiRoutes = {
    postJob: `${baseUrl}/job-create/`,
    postMultiJob: `${baseUrl}/multijob-create/`,
    getWork:(name='')=> `${baseUrl}/works/?name=${name}`,
    createWork: `${baseUrl}/work-create/`,
    deleteWork:(id)=> `${baseUrl}/work_delete/${id}/`,
    getJobs:(name='')=> `${baseUrl}/jobs/?name=${name}`
}