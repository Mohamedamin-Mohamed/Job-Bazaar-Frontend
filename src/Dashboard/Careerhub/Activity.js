import {NavLink} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import getAppliedJobs from "./Jobs/FetchJobsAndApplications/getAppliedJobs";
import getUploadedJobs from "./Jobs/FetchJobsAndApplications/getUploadedJobs";

const Activity = () => {
    const isMediumScreen = useMediaQuery({minWidth: 998});// Set the breakpoint for md screens

    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const email = userInfo.email
    const [countJobs, setCountJob] = useState(0)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = role === 'Applicant' ?
                    await getAppliedJobs(email, new AbortController()) :
                    await getUploadedJobs(email, new AbortController())
                if (response.ok) {
                    const jobs = await response.json()
                    const length = jobs.length
                    setCountJob(length)
                }
            } catch (err) {
                console.error("Couldn't fetch jobs; ", err)
            }
        }
        fetchJobs().catch(err => console.error(err))
    }, [email, role]);
    return (
        <div
            className={`"flex flex-col text-[#367c2b] mt-10 border ${!isMediumScreen ? "w-[88%] mx-12 p-4 mb-8" : "flex w-[345px] p-4"} h-[280px]"`}>
            <h1 className="text-black font-bold p-1.5">My activity</h1>
            <div className="flex justify-between p-2 font-bold hover:underline hover:cursor-pointer">
                <NavLink
                    to={role === 'Employer' ? "my/jobs/uploaded" : "my/jobs/applied"}>{role === 'Employer' ? "Job Uploaded" : "Job Applications"}</NavLink>
                <p className="bg-[#cfd9cc] rounded-md px-1">{countJobs}</p>
            </div>
            <div className="flex justify-between p-2 font-bold hover:underline hover:cursor-pointer">
                <p>Project Applications</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-between p-2 border-b mb-4 pb-6 font-bold hover:underline hover:cursor-pointer">
                <p>Referrals</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-center font-bold hover:underline hover:cursor-pointer">
                <NavLink to='/refer'>Refer a friend</NavLink>
            </div>
        </div>
    )
}
export default Activity
