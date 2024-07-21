const SaveWorkExperience = async (postRequest)=>{
    return await fetch('http://localhost:8080/api/work-experience/save', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequest),
    })
}
export default SaveWorkExperience