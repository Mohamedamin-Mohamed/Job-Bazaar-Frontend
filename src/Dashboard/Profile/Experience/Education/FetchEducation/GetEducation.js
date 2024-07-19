const GetEducation = async (email, abortController)=>{

    return await fetch(`http://localhost:8080/api/user-education/get/${email}`, {
        signal: abortController.signal
    })
}
export default GetEducation
