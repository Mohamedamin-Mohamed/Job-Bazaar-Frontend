const getEducation = async (email, abortController)=>{
    const token = localStorage.getItem("token")
    if(token) {
        return await fetch(`http://localhost:8080/api/user-education/get/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            signal: abortController.signal
        })
    }
}
export default getEducation
