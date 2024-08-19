const deleteEducation = async (email)=>{
    const token = localStorage.getItem("token")
    if(token) {
        return await fetch(`http://localhost:8080/api/user-education/delete/${email}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
export default deleteEducation;