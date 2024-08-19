import {useMediaQuery} from "react-responsive";
import {useState} from "react";
import Active from "./ApplicationStatus/Active";
import InActive from "./ApplicationStatus/InActive";
import countActiveApplications from "./CountApplications/countActiveApplications";
import countInactiveApplications from "./CountApplications/countInactiveApplications";

const DisplayAppliedJobs = ({appliedJobs}) => {
    const mediaQuery = useMediaQuery({minWidth: "1100px"})

    const [activeButton, setActiveButton] = useState('active');
    console.log(appliedJobs.length)
    const activeApplications = countActiveApplications(appliedJobs)
    const inActiveApplications = countInactiveApplications(appliedJobs)

    return (
        <div className="flex flex-col ml-12 mt-12 bg-white mx-8 p-4 rounded-xl md:mb-8">
            <div className="">
                <h1 className="text-2xl font-semibold mb-6">My Applications</h1>
                <p>As the employer is evaluating your qualifications, we may contact you to provide additional
                    information.
                    Thank you for your interest and thank you for using Job Bazaar.</p>
            </div>
            <div className={`flex mt-6 w-full space-x-12 my-4 ${!mediaQuery ? "w-full" : ""}`}>
                <div className={`${activeButton !== 'active' ? 'hover:bg-gray-200 cursor-pointer' : ""} 
                ${!mediaQuery ? "w-[50%]" : "w-[105px]"} ${activeButton === 'active'
                    ? 'border-b-4 rounded-sm border-[#0875e1] cursor-default'
                    : 'hover:bg-gray-200 cursor-pointer'
                } h-[52px] flex justify-center items-center`} onClick={() => setActiveButton('active')}>
                    <button
                        className={`flex justify-start space-x-1`}
                    >
                        <p>Active ({activeApplications})</p>
                    </button>
                </div>
                <div className={`${activeButton !== 'inactive' ? 'hover:bg-gray-200 cursor-pointer' : ""} 
                ${!mediaQuery ? "w-[50%]" : "w-[105px]"} ${activeButton === 'inactive'
                    ? 'border-b-4 rounded-sm border-[#0875e1] cursor-default'
                    : 'hover:bg-gray-200 cursor-pointer'
                } flex justify-center items-center`} onClick={() => setActiveButton('inactive')}>
                    <button
                        className={`flex justify-center md:justify-start ${!mediaQuery ? "w-[50%]" : ""}`}
                    >
                        Inactive ({inActiveApplications})
                    </button>
                </div>
            </div>
            <div className="my-2 border-t py-3">
                {activeButton === 'active' ?
                    <Active appliedJobs={appliedJobs} activeApplications={activeApplications}/> :
                    <InActive appliedJobs={appliedJobs} inActiveApplications={inActiveApplications}/>}
            </div>
        </div>
    )
}
export default DisplayAppliedJobs
