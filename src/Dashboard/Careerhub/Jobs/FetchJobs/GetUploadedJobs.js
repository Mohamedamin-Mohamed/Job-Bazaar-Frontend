const GetJobs = async(getJobRequest, employerEmail)=>{
    const token = localStorage.getItem('token')
    if(token){
        const abortController = new AbortController()
        return fetch(`http://localhost:8080/api/jobs/employer/${employerEmail}`, {
            'Authorization': `Bearer ${token}`,
            signal: abortController.signal
        })
    }
}
export default GetJobs