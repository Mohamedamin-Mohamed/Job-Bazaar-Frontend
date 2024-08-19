import {SlLocationPin} from "react-icons/sl";
import {GiSuitcase} from "react-icons/gi";
import {HiOutlineClock} from "react-icons/hi2";
import {FaIdBadge} from "react-icons/fa";
import {format} from "date-fns";

const Header = ({job, postedDate}) => {
    const date = new Date().toISOString()
    const formattedDate = format(date, 'MM-dd-yyy')

    const appliedDate = new Date(postedDate)
    const currDate = new Date(formattedDate)

    const timeDifference = currDate - appliedDate
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

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
                    <p>Posted {daysDifference > 0 ? (daysDifference + ` Day${daysDifference !== 1 ? "s" : ""} ago`) : "less than a day ago"}</p>
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