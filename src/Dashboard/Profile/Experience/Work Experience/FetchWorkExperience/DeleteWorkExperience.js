const DeleteWorkExperience = async (email)=>{
    return await fetch(`http://localhost:8080/api/work-experience/delete/${email}`, {
        method: "DELETE",
    });
}
export default DeleteWorkExperience