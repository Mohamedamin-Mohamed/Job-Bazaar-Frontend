const saveJobs = async (jobRequest)=>{
    const abortController = new AbortController()
    const token = localStorage.getItem('token')
    if(token) {
        return await fetch('http://localhost:8080/api/jobs/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(jobRequest),
            signal: abortController.signal
        })
    }
}
export default saveJobs