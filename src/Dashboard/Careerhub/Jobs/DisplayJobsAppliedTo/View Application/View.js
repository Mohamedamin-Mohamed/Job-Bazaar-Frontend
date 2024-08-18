import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import GetEducation from "../../../../Profile/Experience/Education/FetchEducation/GetEducation";
import {GoFileSymlinkFile} from "react-icons/go";
import GetWorkExperience from "../../../../Profile/Experience/Work Experience/FetchWorkExperience/GetWorkExperience";
import {useMediaQuery} from "react-responsive";
import {format} from "date-fns";

const View = () => {
    const [education, setEducation] = useState({})
    const [workExperience, setWorkExperience] = useState({})

    const mediaQuery = useMediaQuery({minWidth: "1100px"})

    const location = useLocation()
    const {application} = location.state || {}

    const applicantEmail = application.applicantEmail
    const applicationDate = application.applicationDate
    const date = new Date().toISOString()
    const formattedDate = format(date, 'MM-dd-yyy')

    const appliedDate = new Date(applicationDate)
    const currDate = new Date(formattedDate)

    const timeDifference = currDate - appliedDate
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24)

    if (!application) {
        toast.error("No application data found.")
    }

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const educationResponse = await GetEducation(applicantEmail, new AbortController());
                const workExperienceResponse = await GetWorkExperience(applicantEmail, new AbortController())
                if (educationResponse.ok && workExperienceResponse.ok) {
                    const educationData = await educationResponse.json()
                    const workExperienceData = await workExperienceResponse.json()

                    setEducation(educationData)
                    setWorkExperience(workExperienceData)
                }
            } catch (err) {
                console.error("Couldn't fetch education, ", err)
            }
        }
        fetchEducation().catch(err => console.error(err))
    }, [applicantEmail]);
    return (
        <div className="flex justify-center items-center mb-10 pt-8">
            <ToastContainer position="top-center"/>

            <div className={`${mediaQuery ? "border-l border-r" : ""} w-full mx-24 p-4`}>
                <h1 className="font-semibold text-lg">{application.jobId} {application.position} - Submitted
                    Application</h1>
                <h1 className="pl-2 my-6 font-medium text-[#4a4a4a]">Applied {daysDifference > 0 ? (daysDifference + ` day${daysDifference !== 1 ? "'s" : ""} ago`) : "less than a day ago"}</h1>
                <h1 className="font-semibold text-lg mb-6 text-[#333333]">My Information</h1>
                <div className="pl-2">
                    <div className="flex flex-col text-[#4a4a4a] space-y-2 my-6">
                        <p className="font-medium text-[#494949]">Legal Name</p>
                        <p className="space-x-2">{application.firstName} {application.lastName}</p>
                    </div>
                    <div className="flex flex-col text-[#4a4a4a] space-y-2 my-6">
                        <p className="font-medium text-[#494949]">Address</p>
                        <div>
                            <p>{application.city} ,{application.postalCode}</p>
                            <p>{application.country}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="font-medium text-[#494949]">Email</h1>
                        <p className="text-[#4a4a4a]">{applicantEmail}</p>
                    </div>
                </div>
                <h1 className="font-semibold text-lg mb-6">Work Experience</h1>
                <div className="pl-2">
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="font-medium text-[#494949]">Job Title</h1>
                        <p className="text-[#4a4a4a]">{workExperience.title}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Company</h1>
                        <p>{workExperience.company}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Location</h1>
                        <p>{workExperience.location}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">From</h1>
                        <p>{workExperience.startDate}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">To</h1>
                        <p>{workExperience.endDate}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="font-medium text-[#494949]">Role Description</h1>
                        <p>{workExperience.description}</p>
                    </div>
                </div>
                <h1 className="font-semibold text-lg mb-6">Education</h1>
                <div className="pl-2">
                    <div className="flex flex-col space-y-2 my-6">
                        <h1 className="text-[#494949]">School or University</h1>
                        <p className="text-[#4a4a4a]">{education.school}</p>
                    </div>
                    <div className="flex flex-col space-y-2 mb-6">
                        <h1 className="text-[#494949]">Degree</h1>
                        <p>{education.degree}, {education.major}</p>
                    </div>
                    <h1 className="text-lg font-semibold mb-3">Resume/CV</h1>
                    <div className="flex space-x-2 mt-6">
                        <GoFileSymlinkFile className="w-[62px] h-[50px]" size={24} color="orange"/>
                        <p className="mt-2.5">{application.resumeName}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <p>© {new Date().getFullYear()} Job Bazaar, Inc. All rights reserved.</p>
                </div>
            </div>

        </div>
    )
}
export default View