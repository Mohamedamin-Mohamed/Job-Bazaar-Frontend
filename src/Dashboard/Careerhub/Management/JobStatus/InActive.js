import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import updateJob from "../../Jobs/FetchJobsAndApplications/updateJob";
import {toast, ToastContainer} from "react-toastify";
import getApplicantsPerJob from "../../Jobs/FetchJobsAndApplications/getApplicantsPerJob";
import NoApplication from "./NoApplication"
import {useMediaQuery} from "react-responsive";

const InActive = ({uploadedJobs, inActiveJobs}) => {
    const mediaQuery = useMediaQuery({minWidth: "1050px"});
    const navigate = useNavigate();
    const [hoveredIndex, setHoveredIndex] = useState({})
    const [showOptions, setShowOptions] = useState({})
    const [applicantsPerJob, setApplicantsPerJob] = useState([])
    const [jobIds, setJobIds] = useState([])
    const ref = useRef(null)

    const handlePosition = (jobUploaded) => {
        const cleanedPosition = jobUploaded.position.replace(/[^a-zA-Z]/g, " ")
        navigate(`/careerhub/my-jobs/${cleanedPosition}_${jobUploaded.jobId}`, {
            state: {
                jobUploaded,
                applicantsPerJob
            }
        });
    };

    const handleHoveredIndexes = (index, isHovered) => {
        setHoveredIndex(prevState => ({
            ...prevState,
            [index]: isHovered
        }));
    };

    const handleShowOptions = (index) => {
        setShowOptions(prevState => {
            // Close the currently open menu if it's different from the clicked index
            return (Object.keys(prevState).length && Object.keys(prevState)[0] === index.toString())
                ? {}
                : {[index]: true};
        });
    }

    const handleWithdrawJob = async (job) => {
        try {
            const jobStatus = 'inActive'
            const response = await updateJob(job.employerEmail, job.jobId, jobStatus, new AbortController())
            const data = await response.json()
            if (typeof data === 'boolean') {
                if (!data) {
                    toast.error("Couldn't update job");
                } else {
                    window.location.reload()
                }
            } else {
                throw new Error("Unexpected response format.")
            }
        } catch (err) {
            toast.error(`Couldn't update job: ${err.message}`)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const ids = uploadedJobs.map(job => job.jobId);
        setJobIds(ids);
    }, [uploadedJobs]);

    useEffect(() => {
        const fetchApplicantsPerJob = async () => {
            if (Object.keys(jobIds).length === 0) return //avoid fetching if no jobIds

            try {
                const response = jobIds && await getApplicantsPerJob(jobIds, new AbortController())
                if (response.ok) {
                    const jobApplicationCounts = await response.json()
                    setApplicantsPerJob(jobApplicationCounts)
                }
            } catch (err) {
                console.error("Couldn't fetch job applicants per job")
            }
        }
        fetchApplicantsPerJob().catch(err => console.error(err))
    }, [jobIds])
    return (
        <div className="flex flex-col mt-5 bg-white p-4 rounded-xl md:mb-8 ">
            <ToastContainer position="top-center"/>
            {inActiveJobs > 0 ? (
                <>
                    <div className="flex justify-between border-b border-b-gray-400 pb-4">
                        <div className="md:w-[40%] w-full">
                            <h1>Job Title</h1>
                        </div>
                        {mediaQuery && (
                            <div className="flex space-x-10 justify-end w-full mr-10">
                                <div className="flex space-x-16">
                                    <h1>Job ID</h1>
                                    <h1>Number of Applicants</h1>
                                </div>
                                <div className="flex space-x-12">
                                    <h1>Date Posted</h1>
                                    <h1>Action</h1>
                                </div>
                            </div>
                        )}
                        {!mediaQuery && (
                            <div className="flex justify-end w-[10%] mr-4">
                                <h1>Action</h1>
                            </div>
                        )}
                    </div>
                    {uploadedJobs.map((job, index) => (
                        <>
                            {job.jobStatus === 'inActive' &&
                                <div key={job.jobId} className={`flex justify-between border-b py-3`}>
                                    <div className="flex w-[40%]">
                                        <button onClick={() => handlePosition(job)}
                                                className="text-[#0875e1] hover:bg-gray-100">{job.position}</button>
                                    </div>
                                    {mediaQuery && (
                                        <div className="flex space-x-8 justify-end w-full mr-12">
                                            <div className="flex space-x-32">
                                                <p>{job.jobId}</p>
                                                <div>
                                                    <p className="mr-14 text-[#a31b12] bg-[#ffefee] font-semibold px-1">{applicantsPerJob[job.jobId]}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-12">
                                                <p>{job.postedDate}</p>
                                                <div className={`flex flex-col justify-center items-center w-[36px] h-[36px]
                                            ${hoveredIndex[index] ? "rounded-full bg-gray-200 text-center" : ""}`}>
                                                    <button
                                                        className={`flex justify-center items-center w-full h-full pb-2`}
                                                        onMouseEnter={() => handleHoveredIndexes(index, true)}
                                                        onMouseLeave={() => handleHoveredIndexes(index, false)}
                                                        onClick={() => handleShowOptions(index)}
                                                    >...
                                                    </button>
                                                    {showOptions[index] && (
                                                        <div
                                                            className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-24 ml-40"
                                                            ref={ref}>
                                                            <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                                    onClick={() => handlePosition(job)}>View
                                                                Job
                                                            </button>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {!mediaQuery && (
                                        <div className={`flex flex-col justify-center items-center w-[36px] h-[36px]
                                            ${hoveredIndex[index] ? "rounded-full bg-gray-200 text-center" : ""}`}>
                                            <button className={`flex justify-center items-center w-full h-full pb-2`}
                                                    onMouseEnter={() => handleHoveredIndexes(index, true)}
                                                    onMouseLeave={() => handleHoveredIndexes(index, false)}
                                                    onClick={() => handleShowOptions(index)}
                                            >...
                                            </button>
                                            {showOptions[index] && (
                                                <div
                                                    className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-24 mr-36"
                                                    ref={ref}>
                                                    <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                            onClick={() => handlePosition(job)}>View Application
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            }
                        </>
                    ))}
                </>
            ) : <NoApplication/>}
        </div>
    )
}
export default InActive