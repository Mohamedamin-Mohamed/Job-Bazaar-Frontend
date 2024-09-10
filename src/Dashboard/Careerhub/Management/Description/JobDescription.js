import NavBar from "../../NavBar";
import {useMediaQuery} from "react-responsive";
import UploadedJobDescription from "./UploadedJobDescription";
import CompanyInfo from "../CompanyInfo";
import {useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import getJobById from "../../Jobs/FetchJobsAndApplications/getJobById";
import {ScaleLoader} from "react-spinners";
import NoAvailableJobs from "../../Jobs/AvailableJobs/NoAvailableJobs";

const JobDescription = () => {
    const mediaQuery = useMediaQuery({minWidth: "1284px"})
    const [loading, setLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const [job, setJob] = useState({})
    const location = useLocation()
    const {jobUploaded, applicantsPerJob} = location.state || {}

    const fetchJobById = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getJobById(jobUploaded.employerEmail, jobUploaded.jobId, new AbortController())
            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setJob(data)
            }
            setIsInitialized(true)
        } catch (err) {
            console.error("Couldn't fetch job by id: ", err)
        } finally {
            setIsInitialized(true)
            setLoading(false)
        }
    }, [jobUploaded.employerEmail, jobUploaded.jobId])

    useEffect(() => {
        fetchJobById().catch(err => console.error(err))
    }, [fetchJobById]);
    return (
        <div>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader color="#1c3e17" height={100} width={4}/>
                </div>
            )}

            {Object.keys(job).length > 0 &&
                <NavBar/>
            }
            {isInitialized &&
                <>
                    {Object.keys(job).length > 0 ?
                        <div className={`${mediaQuery ? "flex" : "flex-col"} py-6 justify-center bg-[#f0f1f2] `}>
                            <div>
                                <UploadedJobDescription jobUploaded={jobUploaded}
                                                        applicantsPerJob={applicantsPerJob} job={job}/>
                            </div>
                            {Object.keys(job).length > 0 &&
                                <div>
                                    <CompanyInfo/>
                                </div>
                            }
                        </div>

                        : <NoAvailableJobs role={"Employer"}/>
            }
                </>

            }
        </div>
    )
}
export default JobDescription