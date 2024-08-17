import {useEffect, useState} from "react";
import GetName from "./GetUserInfo";
import {useNavigate} from "react-router-dom";
import JobDetails from "../Details/JobDetails";
import {ScaleLoader} from "react-spinners";

const DisplayUploadedJobs = ({uploadedJobs, employerEmail}) => {
    const [jobById, setJobById] = useState()
    const [clicked, setClicked] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [name, setName] = useState({
        firstName: '',
        lastName: ''
    })
    const handleFetchJobById = async (jobId) => {
        try {
            const controller = new AbortController()
            const token = localStorage.getItem('token')
            const response = await fetch(`http://localhost:8080/api/jobs/${employerEmail}/${jobId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                signal: controller.signal
            })

            if (!response.ok) {
                throw new Error('Failed fetch the job')
            }
            const data = await response.json()
            setJobById(data)

            if (clicked[jobId]) return

            setClicked((prevState) => ({
                [jobId]: true
            }))
            navigate(`${jobId}`)
        } catch (err) {
            console.error('Error fetching job by ID: ', err)
        }
    }

    useEffect(() => {
        if (uploadedJobs.length > 0) {
            const firstJob = uploadedJobs[0]
            setJobById(firstJob)
            navigate(`${firstJob.jobId}`)
            setClicked((prevState) => ({
                [firstJob.jobId]: true
            }))
        }
    }, [navigate, uploadedJobs]);

    useEffect(() => {
        setLoading(true)
        const fetchName = async () => {
            const response = await GetName(employerEmail, new AbortController())
            const data = await response.json()
            setName({
                firstName: data.firstName,
                lastName: data.lastName
            })
            setLoading(false)
        }
        fetchName()
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
                <div className="cursor-pointer overflow-y-scroll h-screen w-[700px] mr-4">
                    {uploadedJobs.map((job) => (
                        <div key={job.jobId}
                             className={`${clicked[job.jobId] ? "border border-[#367c2b] rounded-lg" : ""} p-6 ml-8 my-8 hover:cursor-pointer"`}
                             onClick={() => handleFetchJobById(job.jobId)}>
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
                {jobById && <JobDetails job={jobById} name={name} role={'Employer'}/>}

            </div>
        </div>
    )
}
export default DisplayUploadedJobs