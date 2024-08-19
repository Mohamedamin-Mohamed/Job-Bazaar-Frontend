const getAvailableJobs = async (controller)=>{
    const token = localStorage.getItem('token')

    return await fetch('http://localhost:8080/api/jobs/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        signal: controller.signal
    })
}
export default getAvailableJobs