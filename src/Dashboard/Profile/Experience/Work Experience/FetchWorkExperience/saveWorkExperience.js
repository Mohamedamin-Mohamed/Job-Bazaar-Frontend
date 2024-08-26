const saveWorkExperience = async (postRequest)=>{
    const token = localStorage.getItem("token")
    if(token) {
        return await fetch('http://localhost:8080/api/work-experience/save', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postRequest),
        })
    }
}
export default saveWorkExperience