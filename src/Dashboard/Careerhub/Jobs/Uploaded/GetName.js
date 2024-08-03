const GetName = async (employerEmail, abortController) => {
    return await fetch(`http://localhost:8080/api/person/${employerEmail}/`, {
        signal: abortController.signal
    })
}
export default GetName