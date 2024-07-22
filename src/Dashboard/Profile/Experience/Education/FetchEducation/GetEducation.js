const GetEducation = async (email)=>{
    const abortController = new AbortController()
    return await fetch(`http://localhost:8080/api/user-education/get/${email}`, {
        signal: abortController.signal
    })
}
export default GetEducation
