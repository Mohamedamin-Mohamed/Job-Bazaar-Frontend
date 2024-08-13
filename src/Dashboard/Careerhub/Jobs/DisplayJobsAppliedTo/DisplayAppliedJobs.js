import {useMediaQuery} from "react-responsive";

const DisplayAppliedJobs = ({appliedJobs}) => {
    const mediaQuery = useMediaQuery({minWidth: "1050px"})
    return (
        <div className="flex flex-col ml-12 mt-12 bg-white mx-8 p-4 rounded-xl md:mb-8">
            <div className="w-full">
                <h1 className="text-2xl font-semibold mb-6">My Applications</h1>
                <p>As the employer is evaluating your qualifications, we may contact you to provide additional
                    information.
                    Thank you for your interest and thank you for using Job Bazaar.</p>
            </div>
            <div className="flex mt-6 w-full space-x-12 my-4">
                <div className="flex justify-start space-x-1">
                    <p>Active</p>
                    <p>{appliedJobs.length}</p>
                </div>
                <div className="flex justify-center md:justify-start">
                    Inactive (0)
                </div>
            </div>
            <div className="my-2 border-t py-3">
                {/* Header Row */}
                <div className="flex justify-between border-b border-b-gray-400 pb-4">
                    <div className="md:w-[40%] w-full">
                        <h1>Job Title</h1>
                    </div>
                    {mediaQuery && (
                        <div className="flex space-x-16 justify-end w-full mr-12">
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

                {/* Mapped Rows */}
                {appliedJobs.map((application, index) => (
                    <div key={index} className="flex justify-between border-b py-3">
                        {/* Job Title */}
                        <div className="md:w-[40%] w-full">
                            <h1>{application.position}</h1>
                        </div>
                        {mediaQuery && (
                            <div className="flex space-x-8 justify-end w-full mr-12">
                                <div className="flex space-x-32">
                                    <p>{application.jobId}</p>
                                    <div>
                                        <p className="mr-20 text-[#217a37] bg-[#ebfff0] font-semibold px-1">{application.applicationStatus}</p>
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
                    </div>
                ))}
            </div>

        </div>
    )
}
export default DisplayAppliedJobs
