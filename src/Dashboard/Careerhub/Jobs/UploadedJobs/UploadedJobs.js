import {useEffect, useState} from "react";
import GetUploadedJobs from "../FetchJobs/GetUploadedJobs";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import DisplayUploadedJobs from "./DisplayUploadedJobs";
import GenericRibbon from "../../GenericRibbon";
import {Outlet, useParams} from "react-router-dom";

const UploadedJobs = () => {
    const userInfo = useSelector(state => state.userInfo)
    const employerEmail = userInfo.usrEmail
    const [uploadedJobs, setUploadedJobs] = useState([])

    const {jobId} = useParams()

    useEffect(() => {
        const fetchUploadedJobs = async () => {
            try {
                const response = await GetUploadedJobs(employerEmail)
                if (response.ok) {
                    const jobs = await response.json()
                    setUploadedJobs(jobs)
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
            <GenericRibbon text={"Uploaded Jobs"}/>
            <DisplayUploadedJobs uploadedJobs={uploadedJobs} employerEmail={employerEmail}/>
            <Outlet/>
        </div>
    )
}
export default UploadedJobs