const deleteJob = async (employerEmail, jobId, controller) => {
    const token = localStorage.getItem('token')
    if (token) {
        return await fetch(`http://localhost:8080/api/jobs/delete/${employerEmail}/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            }
        )
    }
}
export default deleteJob