const GetSavedJobs = async()=>{
    const token = localStorage.getItem('token')
    if(token){
        const abortController = new AbortController()
        return fetch(`http://localhost:8080/api/jobs/savedJobs/${email}`, {
            'Authorization': `Bearer ${token}`,
            signal: abortController.signal
        })
    }
}
export default GetSavedJobs