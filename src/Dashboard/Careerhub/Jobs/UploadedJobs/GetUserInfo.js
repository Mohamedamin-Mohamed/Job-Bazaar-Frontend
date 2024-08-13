const GetUserInfo = async (email, abortController) => {
    return await fetch(`http://localhost:8080/api/person/${email}/`, {
        signal: abortController.signal
    })
}
export default GetUserInfo