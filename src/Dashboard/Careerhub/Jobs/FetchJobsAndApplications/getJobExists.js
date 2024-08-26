const getJobExists = async (employerEmail, jobId, controller) => {
    const token = localStorage.getItem('token')
    if(token){
        return await fetch(`http://localhost:8080/api/jobs/exists/${employerEmail}/${jobId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getJobExists