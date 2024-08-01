const GetUploadedJobs = async(employerEmail)=>{
    const token = localStorage.getItem('token')
    if(token){
        const abortController = new AbortController()
        return await fetch(`http://localhost:8080/api/jobs/employer/${employerEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: abortController.signal
        })
    }
}
export default GetUploadedJobs