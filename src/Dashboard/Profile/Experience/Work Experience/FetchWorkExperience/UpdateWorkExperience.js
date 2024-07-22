const UpdateWorkExperience = async (updateRequest)=>{
    return await fetch('http://localhost:8080/api/work-experience/update', {
        method: 'PATCH',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(updateRequest)
    })
}
export default UpdateWorkExperience