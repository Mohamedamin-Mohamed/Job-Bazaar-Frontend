const deleteApplication = async (applicantEmail, jobId, controller) => {
    console.log('applicant email is', applicantEmail)
    const token = localStorage.getItem('token')
    if (token) {
        return await fetch(`http://localhost:8080/api/applications/delete/${applicantEmail}/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            }
        )
    }
}
export default deleteApplication