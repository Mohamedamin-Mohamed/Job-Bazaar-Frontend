import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import GenericRibbon from "../../GenericRibbon";
import {Outlet} from "react-router-dom";
import getAvailableJobs from "../FetchJobsAndApplications/getAvailableJobs";
import DisplayAvailableJobs from "./DisplayAvailableJobs";
import {ScaleLoader} from "react-spinners";
import Display404EmployerOrApplicant from "../DisplayJobsAppliedTo/Display404EmployerOrApplicant";
import NoAvailableJobs from "./NoAvailableJobs";

const AvailableJobs = () => {
    const [availableJobs, setAvailableJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const role = userInfo.role
    const [redirect, setRedirect] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false)

    const fetchAvailableJobs = async () => {
        try {
            setLoading(true);
            const response = await getAvailableJobs(new AbortController());
            setLoading(false);
            if (response.ok) {
                const jobs = await response.json();
                setAvailableJobs(jobs);
            } else {
                const text = await response.text();
                toast.error(text);
            }
            setIsInitialized(true)
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setIsInitialized(true)
        }
    };

    useEffect(() => {
        if (userInfo.role === 'Employer') {
            setRedirect(true);
        } else {
            fetchAvailableJobs().catch(err => console.error(err));
        }
    }, [role]);

    if (redirect) {
        return <Display404EmployerOrApplicant role={"Employer"}/>;
    }

    return (
        <div className="flex flex-col h-screen">
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader color="#1c3e17" height={100} width={4}/>
                </div>
            )}
            {isInitialized &&
                <>
                    <ToastContainer position="top-center"/>
                    {availableJobs.filter(job => job.jobStatus === "active").length === 0 ? (
                        <NoAvailableJobs role={"Applicant"}/>
                    ) : (
                        <>
                            <GenericRibbon text={"Available Jobs"}/>
                            <DisplayAvailableJobs availableJobs={availableJobs}/>
                            <Outlet/>
                        </>
                    )}
                </>
            }
        </div>
    );
};

export default AvailableJobs;
