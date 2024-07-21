const GetWorkExperience = async (email, abortController)=>{
    return await fetch(`http://localhost:8080/api/work-experience/get/${email}`, {
        signal: abortController.signal
    })
}
export default GetWorkExperience