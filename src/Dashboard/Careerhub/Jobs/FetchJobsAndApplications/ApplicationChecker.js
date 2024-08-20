const ApplicationChecker = async (applicantEmail, jobId, controller)=>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch(`http://localhost:8080/api/applications/status?applicantEmail=${applicantEmail}&jobId=${jobId}`, {
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default ApplicationChecker