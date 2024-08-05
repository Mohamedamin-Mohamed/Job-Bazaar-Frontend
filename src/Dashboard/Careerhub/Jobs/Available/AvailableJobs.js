import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import GenericRibbon from "../../GenericRibbon";
import {Outlet} from "react-router-dom";
import GetAvailableJobs from "../FetchJobs/GetAvailableJobs";
import DisplayAvailableJobs from "./DisplayAvailableJobs";

const AvailableJobs = () => {
    const [uploadedJobs, setUploadedJobs] = useState([])

    useEffect(() => {
        const fetchAvailableJobs = async () => {
            try {
                const response = await GetAvailableJobs(new AbortController())
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
        fetchAvailableJobs()
    }, []);
    return (
        <div>
            <ToastContainer position="top-center"/>
            <GenericRibbon text={"Available Jobs"}/>
            <DisplayAvailableJobs uploadedJobs={uploadedJobs}/>
            <Outlet/>
        </div>
    )
}
export default AvailableJobs