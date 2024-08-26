import {useLocation, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import getJobApplicants from "../../Jobs/FetchJobsAndApplications/getJobApplicants";
import {useMediaQuery} from "react-responsive";
import updateJob from "../../Jobs/FetchJobsAndApplications/updateJob";
import MimeTypes from "./MimeTypes";
import NavBar from "../../NavBar";

const ViewApplicants = () => {
    const [jobApplicants, setJobApplicants] = useState([])
    const [noJobApplicants, setNoJobApplicants] = useState(false)

    const [hoveredIndex, setHoveredIndex] = useState({})
    const [showOptions, setShowOptions] = useState({})
    const mediaQuery = useMediaQuery({minWidth: "1050px"});
    const navigate = useNavigate()
    const ref = useRef(null)
    const mimeTypes = MimeTypes

    const location = useLocation()
    const {jobId} = location.state || {}

    if (!jobId) {
        toast.error("No Job Id found");
    }

    useEffect(() => {
        const fetchJobApplicants = async () => {
            try {
                const response = await getJobApplicants(jobId, new AbortController())

                if (response.ok) {
                    const jobsApplicants = await response.json()
                    if (jobsApplicants && Array.isArray(jobsApplicants) && jobsApplicants.length > 0) {
                        setJobApplicants(jobsApplicants)
                    } else {
                        setNoJobApplicants(true)
                    }
                }
            } catch (err) {
                console.error("Unknown error while fetching job applicants")
            }
        }

        fetchJobApplicants().catch(err => console.error(err))
    }, [jobId]);

    const handlePosition = (jobUploaded) => {
        navigate(`/careerhub/my-jobs/${jobUploaded.position}_${jobUploaded.jobId}`, {
            state: {
                jobUploaded,
                jobApplicants
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

    const handleDeleteJob = async (job) => {
        try {
            const response = await updateJob(job.employerEmail, job.jobId, new AbortController())
            const data = await response.json()
            if (typeof data === 'boolean') {
                if (!data) {
                    toast.error("Couldn't delete job");
                } else {
                    window.location.reload()
                }
            } else {
                throw new Error("Unexpected response format.")
            }
        } catch (err) {
            toast.error(`Couldn't delete job: ${err.message}`)
        }
    }

    const handleResume = (file, fileName) => {
        // extract file extension so that we can map each extension to its MIME type
        const fileExtension = fileName.split('.')[1]

        try {
            // the file being passed is of base64-encoded string so we need to decode it into binary data
            const byteCharacters = atob(file);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            //this converts the binary data into a Uint8Array, which is a typed array representing the bytes of the file.
            const byteArray = new Uint8Array(byteNumbers);

            //this selects the MIME type based on the file extension. If the extension is not found, it defaults to application/octet-stream.
            const mimeType = mimeTypes[`.${fileExtension}`] || 'application/octet-stream'

            // create a Blob from the byte array
            const blob = new Blob([byteArray], {type: mimeType});

            // generate a URL for the Blob and open it in a new tab to let employers view or download it
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');

            // revoke the URL after use for memory management purpose as it temporarily holds a reference to the Blob or File data in memory.
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error handling resume:', error);
            toast.error('Failed to open resume');
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


    return (
        <div className="flex flex-col ml-12 mt-5 bg-white mx-10 p-4 rounded-xl md:mb-8 text-sm">
            {Object.keys(jobApplicants).length > 0 && (
                <>
                    <NavBar />
                    <ToastContainer position="top-center"/>
                    <div className="flex justify-between border-b border-b-gray-400 pb-4">
                        <div className="flex md:w-[40%] w-full space-x-6">
                            <h1>Applicant Name</h1>
                        </div>
                        {mediaQuery && (
                            <div className="flex space-x-10 justify-end w-full mr-10">
                                <div className="flex space-x-16">
                                    <h1>Job Id</h1>
                                    <h1>Position</h1>
                                    <h1>Application Date</h1>
                                    <h1>Application Status</h1>
                                </div>
                                <div className="flex space-x-16">
                                    <h1>City</h1>
                                    <h1>Postal Code</h1>
                                    <h1>Country</h1>
                                    <h1>Nationality</h1>
                                    <h1>Gender</h1>
                                </div>
                                <div className="flex space-x-12">
                                    <h1>Resume Posted</h1>
                                    <h1>Additional Doc</h1>
                                    <h1>Employer Contact</h1>
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
                    {jobApplicants.map((jobApplicant, index) => (
                        <div key={index} className={`flex justify-between border-b py-3`}>
                            <div className="flex flex-col md:w-[48%] w-full">
                                <button className="text-[#0875e1] hover:bg-gray-100 whitespace-nowrap mr-12 px-3">
                                    {jobApplicant.firstName} {jobApplicant.lastName}</button>
                                <p>{jobApplicant.applicantEmail}</p>
                            </div>
                            {mediaQuery && (
                                <div className="flex space-x-8 justify-end w-full mr-12">
                                    <div className="flex space-x-12">
                                        <p>{jobApplicant.jobId}</p>
                                        <p>{jobApplicant.position}</p>
                                        <p>{jobApplicant.applicationDate}</p>
                                        <p>{jobApplicant.applicationStatus}</p>
                                    </div>
                                    <div className="flex space-x-12">
                                        <p>{jobApplicant.city}</p>
                                        <p>{jobApplicant.postalCode}</p>
                                        <p>{jobApplicant.country}</p>
                                        <p>{jobApplicant.nationality}</p>
                                        <p>{jobApplicant.gender}</p>
                                    </div>
                                    <div className="flex space-x-12">
                                        <button className="text-[#0875e1] hover:bg-gray-100 w-full px-4"
                                                onClick={() => handleResume(jobApplicant.resume, jobApplicant.resumeName)}>{jobApplicant.resumeName}</button>
                                        {jobApplicant.additionalDoc &&
                                            <button className="text-[#0875e1] hover:bg-gray-100 w-full px-4"
                                                    onClick={() => handleResume(jobApplicant.additionalDoc, jobApplicant.additionalDocName)}>{jobApplicant.additionalDocName}</button>
                                        }
                                        <p>{jobApplicant.employerContact}</p>
                                    </div>
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
                                                className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-36 ml-40"
                                                ref={ref}>
                                                <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                        onClick={() => handlePosition(jobApplicant)}>View
                                                    Application
                                                </button>
                                                <button className="hover:bg-gray-300 w-full text-black p-2 "
                                                        onClick={() => handleDeleteJob(jobApplicant)}>Withdraw
                                                    Job
                                                </button>
                                            </div>
                                        )}
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
                                            className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-36 mr-36"
                                            ref={ref}>
                                            <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                    onClick={() => handlePosition(jobApplicant)}>View Application
                                            </button>
                                            <button className="hover:bg-gray-300 w-full text-black p-2 "
                                                    onClick={() => handleDeleteJob(jobApplicant)}>Withdraw
                                                Job
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
export default ViewApplicants