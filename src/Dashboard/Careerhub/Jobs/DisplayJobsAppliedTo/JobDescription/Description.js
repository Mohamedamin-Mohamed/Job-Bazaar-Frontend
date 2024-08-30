import {useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import getJobById from "../../FetchJobsAndApplications/getJobById";
import Header from "./Header";
import Info from "./Info";
import {useMediaQuery} from "react-responsive";
import WorkPlaceTypeMapping from "./WorkPlaceTypeMapping";
import NoApplication from "./NoApplication"

const Description = () => {
    const mediaQuery = useMediaQuery({minWidth: "1284px"})
    const [job, setJob] = useState({})
    const navigate = useNavigate()
    const workPlaceTypeMapping = WorkPlaceTypeMapping
    const location = useLocation()
    const {application} = location.state || {}
    const applicationDate = application.applicationDate
    const [month, day, year] = applicationDate.split('-') || []
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = month ? monthNames[month - 1] : ''
    const appliedDate = monthName ? `${monthName} ${day}, ${year}` : ''

    if (!application) {
        toast.error("No application data found.")
    }

    const fetchJobById = async () => {
        if (!application) {
            return; // Don't fetch if application is not present
        }

        try {
            const response = await getJobById(application.employerEmail, application.jobId, new AbortController());
            if (response.ok) {
                const data = await response.json();
                setJob(data);
            }
        } catch (err) {
            console.error("Couldn't fetch job by id:", err);
        }
    };

    useEffect(() => {
        fetchJobById().catch(err => console.error(err))
    }, [application]);

    const handleNavigation = (application) => {
        navigate(`../viewApplication/${application.jobId}`, {state: {application}})
    }

    return (
        <div className={`${mediaQuery ? "w-[96%] mx-14" : "mx-10"} pb-10`}>
            {Object.keys(job).length !== 0 ? (
                <>
                    <ToastContainer position="top-center"/>
                    <div className={`p-10 bg-white border rounded-md mt-4`}>
                        <div className="border-b pb-4">
                            <h1 className="text-2xl font-semibold p-2 ml-1">{application.position}</h1>
                            <p className="p-3">You applied for this job on {appliedDate}</p>
                            <button
                                className="p-2 bg-[#e6f0e1] text-[#367c2b] hover:bg-[#367c2b] hover:text-white w-[142px] h-[40px] rounded-md ml-2"
                                onClick={() => handleNavigation(application)}>View
                                Application
                            </button>
                            {application.applicationStatus !== "In Progress" &&
                                <button
                                    className="p-2 bg-[#ffefee] text-[#a31b12] w-[240px] h-[40px] rounded-md ml-2 hover:cursor-not-allowed"
                                >{application.applicationStatus}
                                </button>
                            }
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
            ) : (
                <div className="flex justify-center items-center">
                    <NoApplication/>
                </div>
            )}
        </div>
    )
}
export default Description