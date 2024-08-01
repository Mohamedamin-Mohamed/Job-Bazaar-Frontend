import {useEffect, useState} from "react";
import GetUploadedJobs from "../FetchJobs/GetUploadedJobs";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

const UploadedJobs = () => {
    const userInfo = useSelector(state => state.userInfo)
    const employerEmail = userInfo.usrEmail
    let uploadedJobs = []
    const jobs = uploadedJobs

    const handlePrint = ()=>{
    }
    useEffect(() => {
        const fetchUploadedJobs = async () => {
            try {
                const response = await GetUploadedJobs(employerEmail)
                if (response.ok) {
                    uploadedJobs = await response.json()
                    console.log('Uploaded jobs is ', uploadedJobs)
                    handlePrint()
                } else {
                    const text = response.text()
                    toast.error(text);
                }
            } catch (err) {
                console.error('Error fetching jobs:', err)
            }
        }
        fetchUploadedJobs()
    }, []);

    return (
        <div>
           <ToastContainer position="top-center"/>
            <div>
                {uploadedJobs.map((job, index) =>(
                    <div key={index}>
                        {job}
                        <p>Heyeyyeyy</p>
                        <p>{job.description}</p>
                        <p>{job.requirements}</p>
                        <p>{job.employerEmail}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default UploadedJobs