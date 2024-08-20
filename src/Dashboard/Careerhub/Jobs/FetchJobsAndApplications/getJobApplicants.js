const getJobApplicants = async (jobId, controller) =>{
    const token = localStorage.getItem('token')
    if (token){
        return await fetch(`http://localhost:8080/api/applications/job/${jobId}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getJobApplicants