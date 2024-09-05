import JobPosted from "./JobPosted";
import {useEffect, useState} from "react";
import getUploadedJobs from "../Jobs/FetchJobsAndApplications/getUploadedJobs";
import {ToastContainer} from "react-toastify";
import Display404Applicant from "../Jobs/DisplayJobsAppliedTo/Display404Applicant";
import GenericRibbon from "../GenericRibbon";
import CompanyInfo from "./CompanyInfo";
import {useMediaQuery} from "react-responsive";
import NoAvailableJobs from "../Jobs/AvailableJobs/NoAvailableJobs";

const ManagementHub = () => {
    const [uploadedJobs, setUploadedJobs] = useState([])
    const [isInitialized, setIsInitialized] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const employerEmail = userInfo.email
    const role = userInfo.role
    const mediaQuery = useMediaQuery({minWidth: "1400px"})

    useEffect(() => {
        const fetchJobsUploaded = async () => {
            try {
                const response = await getUploadedJobs(employerEmail, new AbortController())
                if (response.ok) {
                    const jobs = await response.json()
                    setUploadedJobs(jobs)
                }
                setIsInitialized(true)
            } catch (err) {
                console.error(err.message + err)
                setIsInitialized(true)
            }
        }
        fetchJobsUploaded().catch(err => console.error(err))
    }, [employerEmail]);

    return (
        <div>
            {isInitialized && (
                <>
                    <ToastContainer position="top-center"/>

                    {uploadedJobs.length === 0 ? (role === 'Employer' ?
                                <NoAvailableJobs role={role}/>
                                :
                                <Display404Applicant/>
                        )
                        : (
                            <div>
                                <div className="flex flex-col bg-[#f0f1f2]">
                                    <GenericRibbon text={"Management Hub"}/>
                                    <div
                                        className={`${mediaQuery ? "flex mb-10 mx-10 space-x-10" : "flex-col"}`}>
                                        <JobPosted uploadedJobs={uploadedJobs}/>
                                        <CompanyInfo/>
                                    </div>
                                </div>
                            </div>
                        )}
                </>
            )}
        </div>
    )
}
export default ManagementHub