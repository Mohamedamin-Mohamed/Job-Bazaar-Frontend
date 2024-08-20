import {useMediaQuery} from "react-responsive";
import {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import WorkPlaceTypeMapping from "../../Jobs/DisplayJobsAppliedTo/Job Description/WorkPlaceTypeMapping";
import {toast, ToastContainer} from "react-toastify";
import getJobById from "../../Jobs/FetchJobs/getJobById";
import Header from "../../Jobs/DisplayJobsAppliedTo/Job Description/Header";
import Info from "../../Jobs/DisplayJobsAppliedTo/Job Description/Info";

const JobDescription = ()=>{
    const mediaQuery = useMediaQuery({minWidth: "1284px"})
    const [job, setJob] = useState({})
    const navigate = useNavigate()
    const workPlaceTypeMapping = WorkPlaceTypeMapping

    const location = useLocation()
    const { jobUploaded } = location.state || {}

    const applicationDate = jobUploaded.postedDate

    const[month, day, year] = applicationDate.split('-')
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = monthNames[month - 1]
    const appliedDate = monthName + " " + day + ", " + year

    if (!jobUploaded) {
        toast.error("No application data found.")
    }
    const fetchJobById = useCallback(async () => {
        try {
            const response = await getJobById(jobUploaded.employerEmail, jobUploaded.jobId, new AbortController())
            if (response.ok) {
                const data = await response.json()
                setJob(data)
            }
        } catch (err) {
            console.error("Couldn't fetch job by id: ", err)
        }
    }, [jobUploaded.employerEmail, jobUploaded.jobId])

    useEffect(() => {
        fetchJobById().catch(err => console.error(err))
    }, [fetchJobById]);

    const handleNavigation = (application) => {
        navigate(`../viewJob/${jobUploaded.jobId}`, {state: {jobUploaded}})
    }
    return (
        <div className={`${mediaQuery ? "mx-6 w-[850px]" : "mx-10"} pb-10`}>
            {job && (
                <>
                    <ToastContainer position="top-center"/>
                    <div className={`p-10 bg-white border rounded-md mt-4`}>
                        <div className="border-b pb-4">
                            <h1 className="text-2xl font-semibold p-2 ml-1">{jobUploaded.position}</h1>
                            <p className="p-3">You uploaded this job on {appliedDate}</p>
                            <button
                                className="p-2 bg-[#e6f0e1] text-[#367c2b] hover:bg-[#367c2b] hover:text-white w-[142px] h-[40px] rounded-md ml-2"
                                onClick={() => handleNavigation(jobUploaded)}>View
                                Job
                            </button>
                        </div>
                        <Header job={job} postedDate={job.postedDate}/>
                        <Info/>
                        <h1 className="underline font-medium text-lg pb-2">Job Description</h1>
                        <p className="font-medium pb-2 mb-6">What you'll do:</p>
                        <p>{job.description}</p>
                        <h1 className="font-medium text-lg py-6">Basic Qualifications:</h1>
                        <p>{job.requirements}</p>
                        <h1 className="font-medium text-lg py-6">Working model and hours:</h1>
                        <p>This role is {job.workPlace}. {workPlaceTypeMapping[job.workPlace]}</p>
                    </div>
                </>
            )}
        </div>

    )
}
export default JobDescription