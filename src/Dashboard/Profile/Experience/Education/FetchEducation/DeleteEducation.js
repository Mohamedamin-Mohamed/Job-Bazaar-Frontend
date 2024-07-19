const DeleteEducation = async (email)=>{
    return await fetch(`http://localhost:8080/api/user-education/delete/${email}`, {
        method: "DELETE",
    });

}
export default DeleteEducation;