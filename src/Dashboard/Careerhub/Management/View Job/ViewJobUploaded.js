import {useMediaQuery} from "react-responsive";
import {useLocation} from "react-router-dom";
import {format} from "date-fns";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";

const ViewJobUploaded = () => {

    const mediaQuery = useMediaQuery({minWidth: "1100px"})
    const employerInfo = JSON.parse(localStorage.getItem('user'))
    const locationInfo = useSelector(state => state.locationInfo)
    const location = useLocation()
    const {jobUploaded} = location.state || {}

    const employerEmail = jobUploaded.employerEmail
    const applicationDate = jobUploaded.postedDate
    const date = new Date().toISOString()
    const formattedDate = format(date, 'MM-dd-yyy')

    const appliedDate = new Date(applicationDate)
    const currDate = new Date(formattedDate)

    const timeDifference = currDate - appliedDate
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (!jobUploaded) {
        toast.error("No application data found.")
    }

    return (
        <div className="flex justify-center items-center mb-10 pt-8">
            <ToastContainer position="top-center"/>

            <div className={`${mediaQuery ? "border-l border-r" : ""} w-full mx-24 p-4`}>
                <h1 className="font-semibold text-lg">{jobUploaded.jobId} {jobUploaded.position} - Uploaded
                    Job</h1>
                <h1 className="pl-2 my-6 font-medium text-[#4a4a4a]">Uploaded {daysDifference > 0 ? (daysDifference + ` Day${daysDifference !== 1 ? "s" : ""} ago`) : "less than a day ago"}</h1>
                <h1 className="font-semibold text-lg mb-6 text-[#333333]">My Information</h1>
                <div className="pl-2">
                    <div className="flex flex-col text-[#4a4a4a] space-y-2 my-6">
                        <p className="font-medium text-[#494949]">Legal Name</p>
                        <p className="space-x-2">{employerInfo.firstName} {employerInfo.lastName}</p>
                    </div>
                    <div className="flex flex-col text-[#4a4a4a] space-y-2 my-6">
                        <p className="font-medium text-[#494949]">Address</p>
                        <div>
                            <p>{locationInfo.city} ,{locationInfo.states}</p>
                            <p>{locationInfo.country}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="font-medium text-[#494949]">Email</h1>
                        <p className="text-[#4a4a4a]">{employerEmail}</p>
                    </div>
                </div>
                <h1 className="font-semibold text-lg mb-6">Job Description</h1>
                <div className="pl-2">
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="font-medium text-[#494949]">Position</h1>
                        <p className="text-[#4a4a4a]">{jobUploaded.position}</p>
                    </div>
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="font-medium text-[#494949]">Job ID</h1>
                        <p className="text-[#4a4a4a]">{jobUploaded.jobId}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Company</h1>
                        <p>{jobUploaded.company}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Location</h1>
                        <p>{jobUploaded.location}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Function</h1>
                        <p>{jobUploaded.jobFunction}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Job Type</h1>
                        <p>{jobUploaded.jobType}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Work Place</h1>
                        <p>{jobUploaded.workPlace}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Description</h1>
                        <p>{jobUploaded.description}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Requirements</h1>
                        <p>{jobUploaded.requirements}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <p>© {new Date().getFullYear()} Job Bazaar, Inc. All rights reserved.</p>
                </div>
            </div>

        </div>
    )
}
export default ViewJobUploaded
