import JobPosted from "./JobPosted";
import {useEffect, useState} from "react";
import getUploadedJobs from "../Jobs/FetchJobsAndApplications/getUploadedJobs";
import {ToastContainer} from "react-toastify";
import Display404Applicant from "../Jobs/DisplayJobsAppliedTo/Display404Applicant";
import GenericRibbon from "../GenericRibbon";
import CompanyInfo from "./CompanyInfo";
import {useMediaQuery} from "react-responsive";
import NoAvailableJobs from "../Jobs/AvailableJobs/NoAvailableJobs";
import {ScaleLoader} from "react-spinners";

const ManagementHub = () => {
    const [uploadedJobs, setUploadedJobs] = useState([])
    const [isInitialized, setIsInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const employerEmail = userInfo.email
    const role = userInfo.role
    const mediaQuery = useMediaQuery({minWidth: "1400px"})

    useEffect(() => {
        setLoading(true)
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
            } finally {
                setIsInitialized(true)
                setLoading(false)
            }
        }
        fetchJobsUploaded().catch(err => console.error(err))
    }, [employerEmail]);

    return (
        <div>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader color="#1c3e17" height={100} width={4}/>
                </div>
            )}

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