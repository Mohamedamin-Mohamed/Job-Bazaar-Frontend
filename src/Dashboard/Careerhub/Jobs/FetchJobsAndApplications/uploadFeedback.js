const uploadFeedback = async (requestBody, controller) =>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch('http://localhost:8080/api/provide-feedback/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody),
            signal: controller.signal
        })
    }
}
export default uploadFeedback