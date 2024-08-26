import {useMediaQuery} from "react-responsive";
import {useState} from "react";
import countActiveJobs from "./CountJobs/countActiveJobs";
import countInActiveJobs from "./CountJobs/countInActiveJobs";
import Active from "./JobStatus/Active";
import InActive from "./JobStatus/InActive";

const JobPosted = ({uploadedJobs}) => {

    const mediaQuery = useMediaQuery({minWidth: "1100px"})
    const [activeButton, setActiveButton] = useState('active');

    const activeJobs = countActiveJobs(uploadedJobs)
    const inActiveJobs = countInActiveJobs(uploadedJobs)

    console.log(activeJobs, inActiveJobs)

    return (
        <div className="flex flex-col ml-12 mt-12 bg-white mx-8 p-4 rounded-xl md:mb-8">
            <div className="">
                <h1 className="text-2xl font-semibold mb-6">Job Applications Overview</h1>
                <p>As you evaluate the qualifications of the candidates, we encourage you to reach out if you require additional information.
                    Thank you for utilizing Job Bazaar to find the right talent for your team.</p>
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
                        <p>Active ({activeJobs})</p>
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
                        Inactive ({inActiveJobs})
                    </button>
                </div>
            </div>
            <div className="my-2 border-t py-3">
                {activeButton === 'active' ?
                    <Active uploadedJobs={uploadedJobs} activeJobs={activeJobs}/> :
                    <InActive uploadedJobs={uploadedJobs} inActiveJobs={inActiveJobs}/>}
            </div>
        </div>
    );
};
export default JobPosted