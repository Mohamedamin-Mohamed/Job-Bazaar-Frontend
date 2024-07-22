const UpdateEducation = async (updateRequest)=>{
    return await fetch('http://localhost:8080/api/user-education/update', {
        method: 'PATCH',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(updateRequest)
    })
}
export default UpdateEducation