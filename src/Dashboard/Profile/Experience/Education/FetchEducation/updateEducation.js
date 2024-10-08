const updateEducation = async (updateRequest)=>{
    const token = localStorage.getItem("token")
    if(token) {
        return await fetch('http://localhost:8080/api/user-education/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateRequest)
        })
    }
}
export default updateEducation