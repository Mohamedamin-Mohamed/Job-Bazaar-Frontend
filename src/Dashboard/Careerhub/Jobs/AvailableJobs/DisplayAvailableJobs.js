import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import JobDetails from "../Details/JobDetails";
import {ScaleLoader} from "react-spinners";
import GetUserInfo from "../UploadedJobs/GetUserInfo";
import getJobById from "../FetchJobsAndApplications/getJobById";
import ApplicationChecker from "../FetchJobsAndApplications/ApplicationChecker";

const DisplayAvailableJobs = ({availableJobs}) => {
    const [jobById, setJobById] = useState();
    const [clicked, setClicked] = useState({});
    const [loading, setLoading] = useState(false);
    const [employerEmail, setEmployerEmail] = useState('');
    const [hasApplied, setHasApplied] = useState(false);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const role = userInfo.role;
    const applicantEmail = userInfo.email;

    const [name, setName] = useState({
        firstName: '',
        lastName: '',
    });

    const parseDate = (date) => {
        const [month, day, year] = date.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const sortedAvailableJobs = [...availableJobs].sort((a, b) => {
        const dateA = parseDate(a.postedDate);
        const dateB = parseDate(b.postedDate);
        return dateB - dateA;
    });

    const handleFetchJobById = useCallback(async (jobId, employerEmail) => {
        setLoading(true);
        setHasApplied(false);
        setEmployerEmail(employerEmail);
        if (role === 'Applicant') {
            const controller = new AbortController();
            try {
                const response = await getJobById(employerEmail, jobId, controller);
                setLoading(false)
                const hasAppliedTo = await ApplicationChecker(applicantEmail, jobId, controller);
                const applied = await hasAppliedTo.json();

                if (response.ok) {
                    const data = await response.json();
                    setJobById(data);
                    if (applied) {
                        setHasApplied(true);
                    }
                    if (!clicked[jobId]) {
                        setClicked({[jobId]: true});
                    }
                    navigate(`${jobId}`);
                }
            } catch (err) {
                console.error('Error fetching job by ID: ', err);
            } finally {
                setLoading(false);
            }
        }
    }, [role, clicked, navigate, applicantEmail]);

    const displayFirstActiveJob = async () => {
        setLoading(true);
        if (availableJobs.length > 0) {
            const firstActiveJob = sortedAvailableJobs.find(job => job.jobStatus === 'active');
            if (firstActiveJob) {
                const controller = new AbortController();
                try {
                    const hasAppliedTo = await ApplicationChecker(applicantEmail, firstActiveJob.jobId, controller);
                    const applied = await hasAppliedTo.json();

                    setJobById(firstActiveJob);
                    if (applied) {
                        setHasApplied(true);
                    }
                    setClicked({[firstActiveJob.jobId]: true});
                    navigate(`${firstActiveJob.jobId}`);
                } catch (err) {
                    console.error("Couldn't confirm if user has applied to the job ", err);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        displayFirstActiveJob().catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [availableJobs]);

    useEffect(() => {
        if (employerEmail) {
            setLoading(true);
            const fetchUserInfo = async () => {
                const controller = new AbortController();
                try {
                    const employerInfo = await GetUserInfo(employerEmail, controller);
                    const data = await employerInfo.json();
                    setName({
                        firstName: data.firstName,
                        lastName: data.lastName,
                    });
                } catch (err) {
                    console.error("Couldn't retrieve user info ", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserInfo().catch(err => {
                console.error(err);
                setLoading(false);
            });
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
                <div className="cursor-pointer overflow-y-scroll h-screen w-[50%]">
                    {sortedAvailableJobs.map((job, index) => (
                        <div key={index}>
                            {job.jobStatus === 'active' &&
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
                            }
                        </div>
                    ))}
                </div>
                {jobById && <JobDetails job={jobById} name={name} role={'Applicant'} applied={hasApplied}/>}
            </div>
        </div>
    );
};

export default DisplayAvailableJobs;
