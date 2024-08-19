import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import JobDetails from "../Details/JobDetails";
import {ScaleLoader} from "react-spinners";
import GetUserInfo from "../UploadedJobs/GetUserInfo";
import getJobById from "../FetchJobs/getJobById";
import ApplicationChecker from "../FetchJobs/ApplicationChecker";

const DisplayAvailableJobs = ({availableJobs}) => {
    const [jobById, setJobById] = useState()
    const [clicked, setClicked] = useState({})
    const [loading, setLoading] = useState(false)
    const [employerEmail, setEmployerEmail] = useState('')
    const [hasApplied, setHasApplied] = useState(false)
    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const applicantEmail = userInfo.email

    const [name, setName] = useState({
        firstName: '',
        lastName: '',
    })

    const handleFetchJobById = useCallback(async (jobId, employerEmail) => {
        setHasApplied(false) //reason being we want to make sure that every request is stateless and fresh
        setEmployerEmail(employerEmail)
        if (role === 'Applicant') {
            try {
                const response = await getJobById(employerEmail, jobId, new AbortController())
                const hasAppliedTo = await ApplicationChecker(applicantEmail, jobId, new AbortController())
                const applied = await hasAppliedTo.json()

                if (response.ok) {
                    const data = await response.json()
                    setJobById(data)
                    if (applied) {
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
    }, [role, applicantEmail, clicked, navigate])

    useEffect(() => {
        if (availableJobs.length > 0) {
            const firstJob = availableJobs[0]
            setJobById(firstJob)
            navigate(`${firstJob.jobId}`)
            setClicked((prevState) => ({
                [firstJob.jobId]: true
            }))
        }
    }, [navigate, availableJobs]);

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
                    {availableJobs.map((job) => (
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