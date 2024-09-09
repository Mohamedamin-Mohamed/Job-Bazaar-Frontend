import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import getFeedbacks from "../Careerhub/Jobs/FetchJobsAndApplications/getFeedbacks";
import NoFeedback from "./NoFeedback";
import DisplayFeedbacks from "./DisplayFeedbacks";

const FeedbackRequests = ({startDate, endDate}) => {
    const isMediumScreen = useMediaQuery({minWidth: 1040}); // Set the breakpoint for md screens
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const applicantEmail = userInfo.email
    const [feedbacks, setFeedbacks] = useState([])
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getFeedbacks(applicantEmail, new AbortController())
                if (response.ok) {
                    const data = await response.json()
                    setFeedbacks(data)
                }
                setIsInitialized(true)
            } catch (err) {
                console.error("Couldn't fetch feedbacks ", err)
                setIsInitialized(true)
            }
        }
        fetchFeedbacks().catch(err => console.error(err))
    }, []);

    const parseDate = (dateString) => {
        const [month, year, date] = dateString.split("-").map(Number)
        return new Date(year, month - 1, date)
    }

    const filteredFeedbacks = feedbacks.filter((feedback) => {
        const feedbackDate = parseDate(feedback.feedbackDate)
        return feedbackDate >= startDate && feedbackDate <= endDate
    })

    const sortFeedbacks = filteredFeedbacks.sort((a, b) => {
        const dateA = parseDate(a.feedbackDate)
        const dateB = parseDate(b.feedbackDate)
        return dateB - dateA
    })

    return (
        <div className={`flex flex-col ${isMediumScreen ? "w-[95%]" : "w-[95%] mx-5"} border border-gray-300 rounded-xl p-4 bg-white`}>
            {isInitialized &&
                <>
                    <h1 className="text-3xl font-semibold ml-2 mb-6">Feedback Details</h1>
                    <nav
                        className={`flex ${isMediumScreen ? "w-[95%] mt-4" : "w-[96%]"} justify-between font-medium list-none mt-3 border-t pb-4 pt-4`}>
                        <li>Job Id</li>
                        {isMediumScreen ? <>
                            <li>Feedback Date</li>
                            <li>Feedback</li>
                        </>
                            :
                            <li className="ml-20">Feedback Date</li>
                        }
                        <div>
                            <li className={`${!isMediumScreen ? "mr-6" : ""}`}>Status</li>
                        </div>
                    </nav>
                    {Object.keys(sortFeedbacks).length === 0 ? <NoFeedback/> :
                        <DisplayFeedbacks feedbacks={sortFeedbacks}/>}
                </>
            }
        </div>
    )
}
export default FeedbackRequests;