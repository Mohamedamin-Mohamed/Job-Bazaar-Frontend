import {NavLink, useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import getAppliedJobs from "./Jobs/FetchJobsAndApplications/getAppliedJobs";
import getUploadedJobs from "./Jobs/FetchJobsAndApplications/getUploadedJobs";
import countActiveApplications from "./Jobs/DisplayJobsAppliedTo/CountApplications/countActiveApplications";
import countActiveJobs from "./Management/CountJobs/countActiveJobs";
import getReferrals from "./Jobs/FetchJobsAndApplications/getReferrals";

const Activity = () => {
    const isMediumScreen = useMediaQuery({minWidth: 1370});// Set the breakpoint for md screens
    const [referrals, setReferrals] = useState([])
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const role = userInfo.role
    const email = userInfo.email
    const [jobs, setJobs] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = role === 'Applicant' ?
                    await getAppliedJobs(email, new AbortController()) :
                    await getUploadedJobs(email, new AbortController())
                if (response.ok) {
                    const jobs = await response.json()
                    setJobs(jobs)
                }
            } catch (err) {
                console.error("Couldn't fetch jobs; ", err)
            }
        }
        fetchJobs().catch(err => console.error(err))
    }, [email, role]);

    useEffect(() => {
        let count = 0;
        if (role === 'Applicant') {
            count = countActiveApplications(jobs)
        } else {
            count = countActiveJobs(jobs)
        }
        setCount(count)
    }, [jobs]);

    useEffect(() => {
        const fetchReferrals = async () => {
            const response = await getReferrals(userInfo.email, new AbortController())
            if (response.ok) {
                const data = await response.json()
                setReferrals(data)
            }
        }
        fetchReferrals().catch(err => console.error(err))
    }, []);

    return (
        <div
            className={`"flex flex-col text-[#367c2b] mt-10 border ${!isMediumScreen ? "w-[93%] mx-12 p-4 relative" : "flex px-4 pt-3.5 mx-4"} h-[280px]"`}>
            <h1 className="text-black font-bold p-1.5">My activity</h1>
            <div className="flex justify-between p-2 font-bold hover:underline hover:cursor-pointer">
                <NavLink
                    to={role === 'Employer' ? "my/jobs/uploaded" : "my/jobs/applied"}>{role === 'Employer' ? "Job Uploaded" : "Job Applications"}</NavLink>
                <p className="bg-[#cfd9cc] rounded-md px-1">{count}</p>
            </div>
            {role === 'Applicant' &&
                (
                    <>
                        <div
                            className="flex justify-between p-2 border-b mb-4 pb-6 font-bold hover:underline hover:cursor-pointer"
                            onClick={() => navigate('myreferrals')}>
                            <p>Referrals</p>
                            <p className="bg-[#cfd9cc] rounded-md px-1">{referrals.length}</p>
                        </div>

                        <div className={`flex justify-center font-bold hover:underline hover:cursor-pointer`}>
                            <NavLink to='/refer'>Refer a friend</NavLink>
                        </div>
                    </>
                )}
        </div>
    )
}
export default Activity
