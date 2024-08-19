import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Active = ({appliedJobs}) => {
    const mediaQuery = useMediaQuery({minWidth: "1060px"})
    const navigate = useNavigate()
    const [inProgress, setInProgress] = useState(false)
    const handlePosition = (application) => {
        navigate(`/careerhub/Job_Bazaar_Careers/job/${application.position}_${application.jobId}`, {state: {application}})
    }
    useEffect(() => {
        const foundInProgress = appliedJobs.some((application) => application.applicationStatus === 'In Progress')
        setInProgress(foundInProgress)
    }, [appliedJobs]);

    return (
        <div>
            {inProgress ? (
                <>
                    <div className="flex justify-between border-b border-b-gray-400 pb-4">
                        <div className="md:w-[40%] w-full">
                            <h1>Job Title</h1>
                        </div>
                        {mediaQuery && (
                            <div className="flex space-x-16 justify-end w-full mr-8">
                                <div className="flex space-x-28">
                                    <h1>Job ID</h1>
                                    <h1>My Application Status</h1>
                                </div>
                                <div className="flex space-x-12">
                                    <h1>Date Submitted</h1>
                                    <h1>Action</h1>
                                </div>
                            </div>
                        )}
                        {!mediaQuery && (
                            <div className="flex justify-end w-[10%] mr-4">
                                <h1>Action</h1>
                            </div>
                        )}
                    </div>
                    {appliedJobs.map((application, index) => (
                        <div key={index} className="flex justify-between border-b py-3">
                            <>
                                <div className="md:w-[44%] w-full">
                                    <button onClick={() => handlePosition(application)}
                                            className="text-[#0875e1] hover:bg-gray-100">{application.position}</button>
                                </div>
                                {mediaQuery && (
                                    <div className="flex space-x-8 justify-end w-full mr-12">
                                        <div className="flex space-x-32">
                                            <p>{application.jobId}</p>
                                            <div>
                                                <p className="mr-14 text-[#217a37] bg-[#ebfff0] font-semibold px-1">{application.applicationStatus}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-20">
                                            <p>{application.applicationDate}</p>
                                            <p className="ml-auto">....</p>
                                        </div>
                                    </div>
                                )}
                                {!mediaQuery && (
                                    <div className="flex justify-end w-[10%] mr-8">
                                        <p>....</p>
                                    </div>
                                )}
                            </>
                        </div>
                    ))}
                </>
            ) : ""}
        </div>
    )
}
export default Active