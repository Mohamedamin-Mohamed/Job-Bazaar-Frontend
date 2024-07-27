const SaveEducation = async (postRequest) => {
    const token = localStorage.getItem("token")
    return await fetch('http://localhost:8080/api/user-education/save', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postRequest),
    })
}
export default SaveEducation