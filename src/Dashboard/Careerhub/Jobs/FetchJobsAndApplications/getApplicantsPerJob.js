const getApplicantsPerJob = async (jobIds, controller) => {
    const token = localStorage.getItem('token')
    return await fetch('http://localhost:8080/api/jobs/applicants-count', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobIds),
        signal: controller.signal
    })
}
export default getApplicantsPerJob