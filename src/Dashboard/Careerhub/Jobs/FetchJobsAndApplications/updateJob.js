const updateJob = async (employerEmail, jobId, jobStatus, controller) => {
    const token = localStorage.getItem('token')
    if (token) {
        return await fetch(`http://localhost:8080/api/jobs/update/${employerEmail}/${jobId}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({jobStatus: jobStatus}),
                signal: controller.signal
            }
        )
    }
}
export default updateJob