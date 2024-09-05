const getReferrals = async (referrerEmail, controller) =>{
    const token = localStorage.getItem('token')
    if(token){
        return await fetch(`http://localhost:8080/api/referrals/get-referrals/${referrerEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: controller.signal
        })
    }
}
export default getReferrals