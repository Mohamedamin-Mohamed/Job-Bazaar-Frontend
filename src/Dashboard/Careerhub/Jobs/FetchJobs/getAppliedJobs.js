const GetAppliedJobs = async(applicantEmail)=>{
    const token = localStorage.getItem('token')

    if(token){
        const abortController = new AbortController()
        return fetch(`http://localhost:8080/api/applications/users/${applicantEmail}`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            signal: abortController.signal
        })
    }
}
export default GetAppliedJobs