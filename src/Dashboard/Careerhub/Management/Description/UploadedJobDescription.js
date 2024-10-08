import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import WorkPlaceTypeMapping from "../../Jobs/DisplayJobsAppliedTo/JobDescription/WorkPlaceTypeMapping";
import {toast, ToastContainer} from "react-toastify";
import Info from "../../Jobs/DisplayJobsAppliedTo/JobDescription/Info";
import Header from "./Header";

const UploadedJobDescription = ({jobUploaded, applicantsPerJob, job}) => {
    const mediaQuery = useMediaQuery({minWidth: "1284px"})

    const navigate = useNavigate()
    const workPlaceTypeMapping = WorkPlaceTypeMapping
    const applicationDate = jobUploaded.postedDate

    const [month, day, year] = applicationDate.split('-')
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = monthNames[month - 1]
    const appliedDate = monthName + " " + day + ", " + year

    if (!jobUploaded && !applicantsPerJob) {
        toast.error("No job data found.")
    }

    const handleJobNavigation = () => {
        navigate(`../viewJob/${jobUploaded.jobId}`, {state: {jobUploaded}})
    }
    const handleApplicantsNavigation = (jobId) => {
        navigate(`../viewApplicants/${jobId}`, {state: {jobId}})
    }

    return (
        <div className={`${mediaQuery ? "mx-14 w-[96%]" : "mx-10"} pb-10`}>

            <ToastContainer position="top-center"/>
            <div className={`p-10 bg-white border rounded-md mt-4`}>
                <div className="border-b pb-4">
                    <h1 className="text-2xl font-semibold p-2 ml-1">{jobUploaded.position}</h1>
                    <p className="p-3">You uploaded this job on {appliedDate}</p>
                    <div className="flex space-x-6">
                        <button
                            className="p-2 bg-[#e6f0e1] text-[#367c2b] hover:bg-[#367c2b] hover:text-white w-[142px] h-[40px] rounded-md ml-2"
                            onClick={() => handleJobNavigation(jobUploaded)}>View Job
                        </button>
                        {applicantsPerJob[job.jobId] > 0 ?

                            <button
                                className="p-2 bg-[#e6f0e1] text-[#367c2b] hover:bg-[#367c2b] hover:text-white w-[142px] h-[40px] rounded-md ml-2"
                                onClick={() => handleApplicantsNavigation(jobUploaded.jobId)}>View
                                Applicants
                            </button>
                            : ""
                        }
                        {job.jobStatus === 'inActive' &&
                            <button
                                className="p-2 bg-[#ffefee] text-[#a31b12] w-[142px] h-[40px] rounded-md ml-2 hover:cursor-not-allowed"
                            >In Active Job
                            </button>
                        }
                    </div>
                </div>
                <Header job={job} postedDate={job.postedDate} applicantsPerJob={applicantsPerJob}/>
                <Info/>
                <h1 className="underline font-medium text-lg pb-2">Job Description</h1>
                <p className="font-medium pb-2 mb-6">What you'll do:</p>
                <p>{job.description}</p>
                <h1 className="font-medium text-lg py-6">Basic Qualifications:</h1>
                <p>{job.requirements}</p>
                <h1 className="font-medium text-lg py-6">Working model and hours:</h1>
                <p>This role is {job.workPlace}. {workPlaceTypeMapping[job.workPlace]}</p>
            </div>
        </div>

    )
}
export default UploadedJobDescription