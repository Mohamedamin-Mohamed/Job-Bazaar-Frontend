const GetJobById = async (employerEmail, jobId, abortController)=>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch(`http://localhost:8080/api/jobs/${employerEmail}/${jobId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: abortController.signal
        })
    }
}
export default GetJobById