const getAppliedJobs = async (applicantEmail, controller) => {
    const token = localStorage.getItem('token')
    if (token) {
        return fetch(`http://localhost:8080/api/applications/users/${applicantEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getAppliedJobs