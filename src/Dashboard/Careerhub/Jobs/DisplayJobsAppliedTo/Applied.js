import {useCallback, useEffect, useState} from "react";
import GetAppliedJobs from "../FetchJobs/GetAppliedJobs";
import {toast, ToastContainer} from "react-toastify";
import GenericRibbon from "../../GenericRibbon";
import Display404Applicant from "./Display404Applicant";
import NoTasks from "./NoTasks";
import CompanyInfo from "./CompanyInfo";
import {useMediaQuery} from "react-responsive";
import Display404EmployerOrApplicant from "./Display404EmployerOrApplicant";
import DisplayAppliedJobs from "./DisplayAppliedJobs";

const Applied = () => {
    const [appliedJobs, setAppliedJobs] = useState({})
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const applicantEmail = userInfo.email
    const mediaQuery = useMediaQuery({minWidth: "1464px"})

    const fetchAppliedJobs = useCallback(async () => {
        if (role === 'Applicant') {
            try {
                const response = await GetAppliedJobs(applicantEmail)
                if (response.ok) {
                    const jobs = await response.json()
                    setAppliedJobs(jobs)
                }
            } catch (err) {
                toast.error("Encountered an error when fetching jobs", err)
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
    return (
        <div className="max-h-screen mb-10">
            <ToastContainer position="top-center"/>
            {Object.keys(appliedJobs).length === 0 ? (role === 'Employer' ?
                        <Display404EmployerOrApplicant role={role}/>
                        :
                        <Display404Applicant/>
                )
                : (
                    <div>
                        <div className="flex flex-col mt-2 bg-[#f0f1f2]">
                            <GenericRibbon text={"Applied Jobs"}/>
                            <div className="flex space-x-4 text-2xl font-semibold md:ml-14 ml-12 pb-4 pt-8">
                                <h1>Welcome,</h1>
                                <p>{userInfo.firstName}</p>
                                <p>{userInfo.lastName}</p>
                            </div>
                            <div className={mediaQuery ? "flex" : "flex-col"}>
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
    )
}
export default Applied