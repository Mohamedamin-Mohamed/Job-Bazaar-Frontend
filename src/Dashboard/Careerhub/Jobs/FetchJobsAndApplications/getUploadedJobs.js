const getUploadedJobs = async (employerEmail, controller) => {
    const token = localStorage.getItem('token')
    if (token) {
        return await fetch(`http://localhost:8080/api/jobs/employer/${employerEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getUploadedJobs