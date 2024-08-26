const updateWorkExperience = async (updateRequest)=>{
    const token = localStorage.getItem("token")
    if(token) {
        return await fetch('http://localhost:8080/api/work-experience/update', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateRequest)
        })
    }
}
export default updateWorkExperience