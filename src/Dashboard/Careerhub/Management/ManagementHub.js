import JobPosted from "./JobPosted";
import {useEffect, useState} from "react";
import getUploadedJobs from "../Jobs/FetchJobsAndApplications/getUploadedJobs";
import {ToastContainer} from "react-toastify";
import Display404Applicant from "../Jobs/DisplayJobsAppliedTo/Display404Applicant";
import GenericRibbon from "../GenericRibbon";
import CompanyInfo from "./CompanyInfo";
import {useMediaQuery} from "react-responsive";
import NoAvailableJobs from "../Jobs/AvailableJobs/NoAvailableJobs";

const Management = () => {
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
                setIsInitialized(true)
                if (response.ok) {
                    const jobs = await response.json()
                    setUploadedJobs(jobs)
                }
            } catch (err) {
                console.error(err.message + err)
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
                                    <GenericRibbon text={"Applied Jobs"}/>
                                    <div className={mediaQuery ? "flex justify-center mb-10" : "flex-col"}>
                                        <div className="flex flex-col">
                                            <JobPosted uploadedJobs={uploadedJobs}/>
                                        </div>
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
export default Management