import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import JobDetails from "../Details/JobDetails";
import {ScaleLoader} from "react-spinners";
import GetUserInfo from "../UploadedJobs/GetUserInfo";
import GetJobById from "../FetchJobs/GetJobById";
import ApplicationChecker from "../FetchJobs/ApplicationChecker";
import app from "../../../../App";

const DisplayAvailableJobs = ({uploadedJobs}) => {
    const [jobById, setJobById] = useState()
    const [clicked, setClicked] = useState({})
    const [loading, setLoading] = useState(false)
    const [employerEmail, setEmployerEmail] = useState('')
    const[hasApplied, setHasApplied] = useState(false)
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem('user'))
    const applicantEmail = userInfo.email

    const [name, setName] = useState({
        firstName: '',
        lastName: '',
    })
    const handleFetchJobById = async (jobId, employerEmail) => {
        setHasApplied(false) //reason being we want to make sure that every request is stateless and fresh
        setEmployerEmail(employerEmail)
        try {
            const response = await GetJobById(employerEmail, jobId, new AbortController())
            const hasAppliedTo = userInfo.role === 'Applicant' && await ApplicationChecker(applicantEmail, jobId, new AbortController())
            const applied = await hasAppliedTo.json()

            if (response.ok) {
                const data = await response.json()
                setJobById(data)
                if(applied){
                    setHasApplied(true)
                }
                if (clicked[jobId]) return

                setClicked((prevState) => ({
                    [jobId]: true
                }))
                navigate(`${jobId}`)
            }
        } catch (err) {
            console.error('Error fetching job by ID: ', err)
        }
    }

    useEffect(() => {
        if (employerEmail) {
            setLoading(true)
            const fetchUserInfo = async () => {
                const employerInfo = await GetUserInfo(employerEmail, new AbortController())
                const data = await employerInfo.json()
                setName({
                    firstName: data.firstName,
                    lastName: data.lastName,
                })
                setLoading(false)
            }
            fetchUserInfo()
        }
    }, [employerEmail]);
    return (
        <div className="flex h-screen my-8">
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader
                        color="#1c3e17"
                        height={100}
                        width={4}
                    />
                </div>
            )}
            <div className="flex h-[700px] pr-4">
                <div className="cursor-pointer overflow-y-scroll h-screen w-[700px]">
                    {uploadedJobs.map((job) => (
                        <div key={job.jobId}
                             className={`${clicked[job.jobId] ? "border border-[#367c2b] rounded-lg" : ""} p-6 ml-8 my-8 hover:cursor-pointer"`}
                             onClick={() => handleFetchJobById(job.jobId, job.employerEmail)}>
                            <div className="flex font-semibold space-x-2">
                                <h1>{job.jobId}</h1>
                                <h1>{job.position}</h1>
                            </div>
                            <div className="flex space-x-2 my-4">
                                <div className="flex">
                                    <p>{name.firstName}</p>
                                    <p>{name.lastName}</p>
                                </div>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    ))}
                    {uploadedJobs.map((job) => (
                        <div key={job.jobId}
                             className={`${clicked[job.jobId] ? "border border-[#367c2b] rounded-lg" : ""} p-6 ml-8 my-8 hover:cursor-pointer"`}
                             onClick={() => handleFetchJobById(job.jobId, job.employerEmail)}>
                            <div className="flex font-semibold space-x-2">
                                <h1>{job.jobId}</h1>
                                <h1>{job.position}</h1>
                            </div>
                            <div className="flex space-x-2 my-4">
                                <div className="flex">
                                    <p>{name.firstName}</p>
                                    <p>{name.lastName}</p>
                                </div>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    ))}
                    {uploadedJobs.map((job) => (
                        <div key={job.jobId}
                             className={`${clicked[job.jobId] ? "border border-[#367c2b] rounded-lg" : ""} p-6 ml-8 my-8 hover:cursor-pointer"`}
                             onClick={() => handleFetchJobById(job.jobId, job.employerEmail)}>
                            <div className="flex font-semibold space-x-2">
                                <h1>{job.jobId}</h1>
                                <h1>{job.position}</h1>
                            </div>
                            <div className="flex space-x-2 my-4">
                                <div className="flex">
                                    <p>{name.firstName}</p>
                                    <p>{name.lastName}</p>
                                </div>
                                <p>{job.location}</p>
                            </div>
                        </div>
                    ))}

                </div>
                {jobById && <JobDetails job={jobById} name={name} role={'Applicant'} applied={hasApplied}/>}

            </div>
        </div>
    )
}
export default DisplayAvailableJobs