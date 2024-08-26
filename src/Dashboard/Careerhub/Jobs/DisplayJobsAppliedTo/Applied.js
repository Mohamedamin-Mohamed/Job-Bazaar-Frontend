import {useCallback, useEffect, useState} from "react";
import getAppliedJobs from "../FetchJobsAndApplications/getAppliedJobs";
import {ToastContainer} from "react-toastify";
import GenericRibbon from "../../GenericRibbon";
import Display404Applicant from "./Display404Applicant";
import NoTasks from "./NoTasks";
import CompanyInfo from "./CompanyInfo";
import {useMediaQuery} from "react-responsive";
import Display404EmployerOrApplicant from "./Display404EmployerOrApplicant";
import DisplayAppliedJobs from "./DisplayAppliedJobs";
import updateApplicationStatus from "./ApplicationStatus/updateApplicationStatus";

const Applied = () => {
    const [isInitialized, setIsInitialized] = useState(false)
    const [appliedJobs, setAppliedJobs] = useState({})
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const applicantEmail = userInfo.email
    const mediaQuery = useMediaQuery({minWidth: "1464px"})

    const fetchAppliedJobs = useCallback(async () => {
        if (role === 'Applicant') {
            try {
                const response = await getAppliedJobs(applicantEmail, new AbortController())
                if (response.ok) {
                    const jobs = await response.json()
                    setAppliedJobs(jobs)
                }
            } catch (err) {
                console.error("Encountered an error when fetching jobs", err)
            }
        }
    }, [applicantEmail, role])

    useEffect(() => {
        const controller = new AbortController()

        fetchAppliedJobs().catch(err => console.error("Couldn't fetch jobs: ", err))
        return () => {
            controller.abort()
        }
    }, [fetchAppliedJobs]);

    //here we check if a job exists if not we update the users applied job to be in active and use job withdrawn as application status
    useEffect(() => {
        setIsInitialized(true)
        updateApplicationStatus(appliedJobs).catch(err => console.error(err))
    }, [appliedJobs]);

    return (
        isInitialized ?
            <div className="mb-10">
                <ToastContainer position="top-center"/>
                {Object.keys(appliedJobs).length === 0 ? (role === 'Employer' ?
                            <Display404EmployerOrApplicant role={role}/>
                            :
                            <Display404Applicant/>
                    )
                    : (
                        <div>
                            <div className="flex flex-col bg-[#f0f1f2]">
                                <GenericRibbon text={"Applied Jobs"}/>
                                <div className={mediaQuery ? "flex justify-center" : "flex-col"}>
                                    <div className="flex flex-col">
                                        <NoTasks/>
                                        <DisplayAppliedJobs appliedJobs={appliedJobs}/>
                                    </div>
                                    <CompanyInfo/>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            : ""
    )
}
export default Applied