import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useRef, useState} from "react";
import getJobApplicants from "../../Jobs/FetchJobsAndApplications/getJobApplicants";
import {useMediaQuery} from "react-responsive";
import MimeTypes from "./MimeTypes";
import ApplicantDetails from "./ApplicantDetails";

const ViewApplicants = () => {
    const [jobApplicants, setJobApplicants] = useState([])

    const mediaQuery = useMediaQuery({minWidth: "1282px"});
    const mediaQuery2 = useMediaQuery({minWidth: "780px"})
    const ref = useRef(null)
    const mimeTypes = MimeTypes
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const location = useLocation()
    const {jobId} = location.state || {}

    if (!jobId) {
        toast.error("No Job Id found");
    }
    const handleApplicantClick = (applicant) => {
        setSelectedApplicant(applicant);
    };

    const handleCloseDetails = () => {
        setSelectedApplicant(null);
    };

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
        const fetchJobApplicants = async () => {
            try {
                const response = await getJobApplicants(jobId, new AbortController())

                if (response.ok) {
                    const jobsApplicants = await response.json()
                    if (jobsApplicants && Array.isArray(jobsApplicants) && jobsApplicants.length > 0) {
                        setJobApplicants(jobsApplicants)
                    }
                }
            } catch (err) {
                console.error("Unknown error while fetching job applicants")
            }
        }

        fetchJobApplicants().catch(err => console.error(err))
    }, [jobId]);

    return (
        <div className="relative flex flex-col ml-12 mt-5 bg-white mx-10 p-14 rounded-xl md:mb-8 border">
            <ToastContainer position="top-center"/>
            <div className="flex w-full border-b border-b-gray-400 pb-4 text-sm">
                <div className="w-[15%]">
                    <h1>Applicant Name</h1>
                </div>
                {mediaQuery && (
                    <div className="flex space-x-8 justify-center w-[90%] ml-20">
                        <div className="flex space-x-32">
                            <h1>Job Id</h1>
                            <h1>Position</h1>
                            <h1 className="ml-10">Application Date</h1>
                            <h1>Resume Posted</h1>
                        </div>
                    </div>
                )}
                {!mediaQuery && mediaQuery2 && (
                    <div className="flex justify-end items-end w-[80%] space-x-32">
                        <h1>Job Id</h1>
                        <h1>Position</h1>
                    </div>
                )}
                {!mediaQuery2 && (
                    <div className="flex ml-auto mr-12">
                        <h1>Position</h1>
                    </div>
                )}
            </div>

            {jobApplicants.map((jobApplicant, index) => (
                <div key={index} className={`flex justify-between border-b py-3`}>
                    <div className="flex">
                        <button
                            className={` ${jobApplicant.isActive === "true" ? "text-[#0875e1]" : "text-[#a31b12]"} hover:bg-gray-100 whitespace-nowrap mr-12 px-4 ${!mediaQuery2 ? "text-sm" : ""}
                             ${jobApplicant.isActive === "false" && "cursor-not-allowed"}`}
                            onClick={jobApplicant.isActive === "true" ? () => handleApplicantClick(jobApplicant) : null}
                        >
                            {jobApplicant.firstName} {jobApplicant.lastName}
                        </button>
                    </div>
                    {mediaQuery && (
                        <div className="flex space-x-8 justify-center w-[75%]">
                            <div className="flex space-x-16">
                                <p>{jobApplicant.jobId}</p>
                                <p className="w-[158px]">{jobApplicant.position}</p>
                                <p>{jobApplicant.applicationDate}</p>
                            </div>
                            <div className="flex space-x-12 w-[28%]">
                                <button className="text-[#0875e1] hover:bg-gray-100 px-4"
                                        onClick={() => handleResume(jobApplicant.resume, jobApplicant.resumeName)}>{jobApplicant.resumeName}</button>
                            </div>
                        </div>
                    )}
                    {!mediaQuery && mediaQuery2 && (
                        <div className="flex justify-end items-end space-x-14">
                            <p>{jobApplicant.jobId}</p>
                            <p>{jobApplicant.position}</p>
                        </div>
                    )}
                    {!mediaQuery2 && (
                        <p className="text-sm w-[40%]">{jobApplicant.position}</p>
                    )}
                </div>
            ))}

            {selectedApplicant && (
                <ApplicantDetails
                    applicant={selectedApplicant}
                    onClose={handleCloseDetails}
                    handleResume={handleResume}
                />
            )}
        </div>
    );
}
export default ViewApplicants