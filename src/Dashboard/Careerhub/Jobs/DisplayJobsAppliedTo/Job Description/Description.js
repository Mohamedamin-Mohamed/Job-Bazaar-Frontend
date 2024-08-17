import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import NavBar from "../../../NavBar";
import {useCallback, useEffect, useState} from "react";
import GetJobById from "../../FetchJobs/GetJobById";
import Header from "./Header";
import CompanyInfo from "../CompanyInfo";
import Info from "./Info";

const Description = () => {
    const [job, setJob] = useState({})
    const location = useLocation()
    const {application} = location.state || {}

    if (!application) {
        toast.error("No application data found.")
    }
    const fetchJobById = useCallback(async () => {
        try {
            const response = await GetJobById(application.employerEmail, application.jobId, new AbortController())
            if (response.ok) {
                const data = await response.json()
                setJob(data)
            }
        } catch (err) {
            console.error("Couldn't fetch job by id: ", err)
        }
    }, [application.employerEmail, application.jobId])

    useEffect(() => {
        fetchJobById().catch(err => console.error(err))
    }, [fetchJobById]);

    return (
        <div className="#bg-[#f0f1f2]">
            <ToastContainer position="top-center"/>
            <NavBar/>
            <div className="p-4 bg-white">
                <div className="border-b pb-4">
                    <h1 className="text-2xl font-semibold p-2 ml-1">{application.position}</h1>
                    <p className="p-3">You applied for this job on {application.applicationDate}</p>
                    <button
                        className="p-2 bg-[#e6f0e1] text-[#367c2b] hover:bg-[#367c2b] hover:text-white w-[142px] h-[40px] rounded-md ml-2">View
                        Application
                    </button>
                </div>
                <Header job={job}/>
                <Info />
                <h1 className="underline font-medium text-lg pb-2">Job Description</h1>
                <p className="font-medium pb-2">What you'll do</p>
                <p>{job.description}</p>
                <h1 className="font-medium text-lg py-2">Basic Qualifications:</h1>
                <p>{job.requirements}</p>
                <h1 className="font-medium text-lg py-2">Working model and hours:</h1>
            </div>
        </div>

    )
}
export default Description