import {useEffect, useState} from "react";
import getAvailableJobs from "../Jobs/FetchJobsAndApplications/getAvailableJobs";

const Jobs = ({handleExplore})=>{
    const[recentJob, setRecentJob] = useState({})

    const parseDate = (dateString)=>{
        const[month, day, year] = dateString.split('-').map(Number)
        return new Date(year, month - 1, day)
    }
    const sortAvailableJobs = (job)=>{
        return job.sort((a,b)=>{
            const postedDateA = parseDate(a.postedDate)
            const postedDateB = parseDate(b.postedDate)
            return postedDateB - postedDateA
        })
    }

    const fetchRecentJob = async()=>{
        try{
            const response = await getAvailableJobs(new AbortController())
            if(response.ok){
                const job = await  response.json()
                const sortedAvailableJobs = sortAvailableJobs(job);
                setRecentJob(sortedAvailableJobs[0])
            }
        }
        catch (err){
            console.error("Couldn't retrieve first job posted recently")
        }
    }

    useEffect(() => {
        fetchRecentJob().catch(err => console.error(err + err.message))
    }, []);

    return (
        <div className={`flex flex-col w-full border h-[288px] bg-[#fff89c] p-6 text-[#5c5500] mt-8 z-50`}>
            <div className="flex flex-col mb-6">
                <h1 className="font-medium text-lg">Jobs</h1>
                <p className="font-semibold">Browse opportunities for you or friends</p>
            </div>
            <div className="flex flex-col mb-6">
                <p className="font-semibold">Posted recently</p>
                <h1 className="font-medium text-lg">{recentJob.position}</h1>
            </div>
            <div className="flex">
                <div className="w-[100px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                title="Software Engineering">Software Engi</div>
                <div className="w-[100px] h-[26px] border px-1 mx-2 bg-white text-[#9b9b9b] font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                title="Electrical Engineering">Electrical Engi</div>
                <div className="w-[100px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                title="Computer Engineering">Computer Engi</div>
            </div>
            <button className="bg-white w-[100%] mt-5 p-2 text-[#367c2b] font-semibold hover:bg-[#367c2b] hover:text-white" onClick={() => handleExplore('jobs')}>Explore
                Jobs
            </button>
        </div>
    )
}
export default Jobs