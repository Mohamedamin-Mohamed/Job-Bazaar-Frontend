import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import NoApplication from "./NoApplication";
import {useEffect, useRef, useState} from "react";
import {ToastContainer} from "react-toastify";
import updateApplication from "../../FetchJobsAndApplications/updateApplication";
import {ScaleLoader} from "react-spinners";

const Active = ({appliedJobs, activeApplications}) => {
    const mediaQuery = useMediaQuery({minWidth: "1080px"});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [hoveredIndex, setHoveredIndex] = useState({})
    const [showOptions, setShowOptions] = useState({})
    const ref = useRef(null)

    const parseDate = (dateString) => {
        const [month, day, year] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    // sorting appliedJobs by applicationDate
    const sortedAppliedJobs = [...appliedJobs].sort((a, b) => {
        const dateA = parseDate(a.applicationDate);
        const dateB = parseDate(b.applicationDate);
        return dateB - dateA; // sort descending
    });

    const handlePosition = (application) => {
        navigate(`/careerhub/Job_Bazaar_Careers/job/${application.position}_${application.jobId}`, {state: {application}});
    };

    const handleHoveredIndexes = (index, isHovered) => {
        setHoveredIndex(prevState => ({
            ...prevState,
            [index]: isHovered
        }));
    };

    const handleShowOptions = (index) => {
        setShowOptions(prevState => {
            // Close the currently open menu if it's different from the clicked index
            return (Object.keys(prevState).length && Object.keys(prevState)[0] === index.toString())
                ? {}
                : {[index]: true};
        });
    }

    const handleWithdrawApplication = async (application) => {
        setLoading(true)
        try {
            const applicationStatus = 'Candidate Withdrew Interest'
            const updateResponse = await updateApplication(application.applicantEmail, application.jobId, applicationStatus, new AbortController())
            setLoading(false)
            if (!updateResponse.ok) {
                const data = await updateResponse.json()
                throw new Error(data)
            } else {
                window.location.reload()
            }
        } catch (err) {
            console.error(err)
            setLoading(false)
        }
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowOptions({});
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader color="#1c3e17" height={100} width={4}/>
                </div>
            )}

            <ToastContainer position="top-center"/>
            {activeApplications > 0 ? (
                <>
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
                    {sortedAppliedJobs.map((application, index) => (
                        application.isActive === "true" ? (
                            <div
                                key={index}
                                className={`flex justify-between border-b py-3`}
                            >
                                <div className="flex w-[40%]">
                                    <button onClick={() => handlePosition(application)}
                                            className="text-[#0875e1] hover:bg-gray-100 p-4">{application.position}</button>
                                </div>
                                {mediaQuery && (
                                    <div className="flex space-x-8 justify-end w-full mr-12">
                                        <div className="flex space-x-32">
                                            <p>{application.jobId}</p>
                                            <div>
                                                <p className="mr-14 text-[#217a37] bg-[#ebfff0] font-semibold px-1 w-[86px] overflow-hidden text-ellipsis whitespace-nowrap"
                                                   title={application.applicationStatus}>
                                                    {application.applicationStatus}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-20">
                                            <p>{application.applicationDate}</p>
                                            <div className={`flex flex-col justify-center items-center w-[36px] h-[36px]
                                            ${hoveredIndex[index] ? "rounded-full bg-gray-200 text-center" : ""}`}>
                                                <button
                                                    className={`flex justify-center items-center w-full h-full pb-2`}
                                                    onMouseEnter={() => handleHoveredIndexes(index, true)}
                                                    onMouseLeave={() => handleHoveredIndexes(index, false)}
                                                    onClick={() => handleShowOptions(index)}
                                                >...
                                                </button>
                                                {showOptions[index] && (
                                                    <div
                                                        className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-36 ml-40"
                                                        ref={ref}>
                                                        <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                                onClick={() => handlePosition(application)}>View
                                                            Application
                                                        </button>
                                                        <button className="hover:bg-gray-300 w-full text-black p-2 "
                                                                onClick={() => handleWithdrawApplication(application)}>Withdraw
                                                            Application
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!mediaQuery && (
                                    <div className={`flex flex-col justify-center items-center w-[36px] h-[36px]
                                            ${hoveredIndex[index] ? "rounded-full bg-gray-200 text-center" : ""}`}>
                                        <button className={`flex justify-center items-center w-full h-full pb-2`}
                                                onMouseEnter={() => handleHoveredIndexes(index, true)}
                                                onMouseLeave={() => handleHoveredIndexes(index, false)}
                                                onClick={() => handleShowOptions(index)}
                                        >...
                                        </button>
                                        {showOptions[index] && (
                                            <div
                                                className="absolute flex-col w-[180px] border rounded-md space-y-2 bg-white text-white mt-36 mr-36"
                                                ref={ref}>
                                                <button className="bg-[#0875e1] w-full p-2 mt-2"
                                                        onClick={() => handlePosition(application)}>View Application
                                                </button>
                                                <button className="hover:bg-gray-300 w-full text-black p-2 "
                                                        onClick={() => handleWithdrawApplication(application)}>Withdraw
                                                    Application
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : null
                    ))}
                </>
            ) : <NoApplication/>}
        </div>
    );
};

export default Active;
