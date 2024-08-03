import {IoLocationOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";
import {PiFingerprintLight, PiUsersThree} from "react-icons/pi";
import {MdBusiness} from "react-icons/md";

const Headers = ({job, name}) => {
    return (
        <div className="flex-col pb-8">

            <div className="flex pl-8 py-4 mt-4">
                <div className="flex text-lg gap-4 w-[370px]">
                    <IoLocationOutline size={24} color="gray" className="mt-1.5"/>
                    <div className="flex-col">
                        <h1 className="font-bold text-xl">Job Location</h1>
                        <p>{job.location}</p>
                    </div>
                </div>
                <div className="flex ml-[100px] gap-4 text-lg">
                    <FaRegUser size={24} color="gray" className="mt-1.5"/>
                    <div className="flex-col">
                        <h1 className="font-bold text-xl">Job Uploader</h1>
                        <div className="flex space-x-2">
                            <p>{name.firstName}</p>
                            <p>{name.lastName}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex pl-8 mt-4">
                <div className="flex text-lg gap-4 w-[370px]">
                    <PiUsersThree size={24} color="gray" className="mt-1.5"/>
                    <div className="flex-col">
                        <h1 className="font-bold text-xl">Function</h1>
                        <p>{job.jobFunction}</p>
                    </div>
                </div>
                <div className="flex ml-[100px] text-lg gap-4">
                    <PiFingerprintLight size={24} color="gray" className="mt-1.5"/>
                    <div className="flex-col">
                        <h1 className="font-bold text-xl">Job ID</h1>
                        <p>{job.jobId}</p>
                    </div>
                </div>
            </div>
            <div className="flex pl-8 mt-8">
                <MdBusiness size={24} color="gray" className="mt-2"/>
                <div className="flex-col ml-4">
                    <h1 className="font-bold text-xl">Company</h1>
                    <p>{job.company}</p>
                </div>
            </div>
        </div>
    )
}
export default Headers