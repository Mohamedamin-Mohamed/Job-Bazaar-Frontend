import {SlLocationPin} from "react-icons/sl";
import {GiSuitcase} from "react-icons/gi";
import {HiOutlineClock} from "react-icons/hi2";
import {FaIdBadge} from "react-icons/fa";

const Header = ({ job })=>{
    return (
        <div className="flex md:flex-row md:space-x-16 flex-col mt-4">
            <div className="flex space-x-2 p-2">
                <SlLocationPin size={22} color="gray"/>
                <p>{job.location}</p>
            </div>
            <div>
                <div className="flex space-x-2 p-2">
                    <GiSuitcase size={22} color="gray"/>
                    <p>{job.jobType}</p>
                </div>
                <div className="flex space-x-2 p-2">
                    <HiOutlineClock size={22} color="gray"/>
                    <p>{job.postedDate}</p>
                </div>
                <div className="flex space-x-2 p-2">
                    <FaIdBadge size={22} color="gray"/>
                    <p>{job.jobId}</p>
                </div>
            </div>
        </div>
    )
}
export default Header