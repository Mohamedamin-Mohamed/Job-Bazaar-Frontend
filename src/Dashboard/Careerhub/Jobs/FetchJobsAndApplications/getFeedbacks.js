const getFeedbacks = async (applicantEmail, controller)=>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch(`http://localhost:8080/api/feedbacks/applicant/${applicantEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getFeedbacks