const updateApplication = async (applicantEmail, jobId, applicationStatus, controller) => {
    const token = localStorage.getItem('token')
    if (token) {
        return await fetch(`http://localhost:8080/api/applications/updateApplicationStatus/${applicantEmail}/${jobId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({applicationStatus: applicationStatus}),
            signal: controller.signal
        })
    }
}
export default updateApplication