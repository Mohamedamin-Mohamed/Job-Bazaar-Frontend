import {useCallback, useEffect, useState} from "react";
import GetUploadedJobs from "../FetchJobs/GetUploadedJobs";
import {toast, ToastContainer} from "react-toastify";
import DisplayUploadedJobs from "./DisplayUploadedJobs";
import GenericRibbon from "../../GenericRibbon";
import {Outlet} from "react-router-dom";
import Display404EmployerOrApplicant from "../DisplayJobsAppliedTo/Display404EmployerOrApplicant";

const UploadedJobs = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const employerEmail = userInfo.email
    const [uploadedJobs, setUploadedJobs] = useState([])
    const [redirect, setRedirect] = useState(false)

    const fetchUploadedJobs = useCallback(async () => {
        try {
            if (role === 'Employer') {
                const response = await GetUploadedJobs(employerEmail)
                if (response.ok) {
                    const jobs = await response.json()
                    setUploadedJobs(jobs)
                } else {
                    const text = await response.text()
                    toast.error(text);
                }
            }
        } catch (err) {
            console.error('Error fetching jobs:', err)
        }
    }, [role, employerEmail])

    useEffect(() => {
        if (role === 'Applicant') {
            setRedirect(true)
            return
        }
        fetchUploadedJobs().catch(err => console.error('Error in fetchUploadedJobs: ', err))
    }, [fetchUploadedJobs, role]);

    return (
        <div>
            <ToastContainer position="top-center"/>
            {redirect ?
                <Display404EmployerOrApplicant role={role}/>
                :
                <>
                    <GenericRibbon text={"Uploaded Jobs"}/>
                    <DisplayUploadedJobs uploadedJobs={uploadedJobs} employerEmail={employerEmail}/>
                    <Outlet/>
                </>
            }
        </div>
    )
}
export default UploadedJobs