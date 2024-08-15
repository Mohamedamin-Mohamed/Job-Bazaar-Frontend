import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import GenericRibbon from "../../GenericRibbon";
import {Outlet} from "react-router-dom";
import GetAvailableJobs from "../FetchJobs/GetAvailableJobs";
import DisplayAvailableJobs from "./DisplayAvailableJobs";
import {ScaleLoader} from "react-spinners";
import Display404EmployerOrApplicant from "../DisplayJobsAppliedTo/Display404EmployerOrApplicant";

const AvailableJobs = () => {
    const [uploadedJobs, setUploadedJobs] = useState([])
    const[loading, setLoading] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const[redirect, setRedirect] = useState(false)

    useEffect(() => {
        if(userInfo.role === 'Employer'){
            setRedirect(true)
            return
        }
        const fetchAvailableJobs = async () => {
            try {
                setLoading(true)
                const response = await GetAvailableJobs(new AbortController())
                setLoading(false)
                if (response.ok) {
                    const jobs = await response.json()
                    setUploadedJobs(jobs)
                } else {
                    const text = response.text()
                    toast.error(text);
                }
            } catch (err) {
                console.error('Error fetching jobs:', err)
            }
        }
        fetchAvailableJobs()
    }, [userInfo.role]);
    return (
        <div className="flex flex-col h-screen">
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader
                        color="#1c3e17"
                        height={100}
                        width={4}
                    />
                </div>
            )}
            <ToastContainer position="top-center"/>
            {redirect ?
                <Display404EmployerOrApplicant />
                :
                <>
            <GenericRibbon text={"Available Jobs"}/>
            <DisplayAvailableJobs uploadedJobs={uploadedJobs}/>
            <Outlet/>
                </>
            }
        </div>
    )
}
export default AvailableJobs