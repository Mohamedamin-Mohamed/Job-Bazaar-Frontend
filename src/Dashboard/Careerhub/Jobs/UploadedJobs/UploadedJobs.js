import {useCallback, useEffect, useState} from "react";
import getUploadedJobs from "../FetchJobsAndApplications/getUploadedJobs";
import {ToastContainer} from "react-toastify";
import DisplayUploadedJobs from "./DisplayUploadedJobs";
import GenericRibbon from "../../GenericRibbon";
import {Outlet} from "react-router-dom";
import Display404EmployerOrApplicant from "../DisplayJobsAppliedTo/Display404EmployerOrApplicant";
import NoAvailableJobs from "../AvailableJobs/NoAvailableJobs";
import countActiveJobs from "../../Management/CountJobs/countActiveJobs";
import {ScaleLoader} from "react-spinners";

const UploadedJobs = () => {
    const [uploadedJobs, setUploadedJobs] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [activeJobsCount, setActiveJobsCount] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user')) || {};
    const role = userInfo.role || '';
    const employerEmail = userInfo.email || '';

    const fetchUploadedJobs = useCallback(async () => {
        setLoading(true)
        try {
            if (role === 'Employer' && employerEmail) {
                const response = await getUploadedJobs(employerEmail, new AbortController());
                setLoading(false)
                if (response.ok) {
                    const jobs = await response.json();
                    setUploadedJobs(jobs);
                }
                setIsInitialized(true)
            }
        } catch (err) {
            console.error('Error fetching jobs:', err);
        } finally {
            setIsInitialized(true)
            setLoading(false)
        }
    }, [role, employerEmail]);

    useEffect(() => {
        if (role === 'Applicant') {
            setRedirect(true);
        } else {
            fetchUploadedJobs().catch(err => console.error('Error in fetchUploadedJobs: ', err));
        }
    }, [role, fetchUploadedJobs]);

    useEffect(() => {
        const countActiveUploadedJobs = countActiveJobs(uploadedJobs);
        setActiveJobsCount(countActiveUploadedJobs);
    }, [uploadedJobs]);

    if (redirect) {
        return <Display404EmployerOrApplicant role={role}/>;
    }

    const hasActiveJobs = uploadedJobs.filter(job => job.jobStatus === "active").length > 0;

    return (
        <div>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader
                        color="#1c3e17"
                        height={100}
                        width={4}
                    />
                </div>
            )}

            {isInitialized &&
                <>
                    <ToastContainer position="top-center"/>
                    {hasActiveJobs && activeJobsCount > 0 ? (
                        <>
                            <GenericRibbon text={"Uploaded Jobs"}/>
                            <DisplayUploadedJobs uploadedJobs={uploadedJobs} employerEmail={employerEmail}/>
                            <Outlet/>
                        </>
                    ) : (
                        <NoAvailableJobs role={"Employer"}/>
                    )}
                </>
            }
        </div>

    );
};

export default UploadedJobs;
