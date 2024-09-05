const addReferral = async (formData, controller) =>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch('http://localhost:8080/api/referrals/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
            signal: controller.signal
        })
    }
}
export default addReferral