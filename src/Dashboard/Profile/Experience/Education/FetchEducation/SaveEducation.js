const Save = async (postRequest) => {

    return await fetch('http://localhost:8080/api/user-education/save', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postRequest),
    })
}
export default Save