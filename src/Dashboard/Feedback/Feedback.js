import 'react-datepicker/dist/react-datepicker.css'
import DateRange from "./DateRange";
import FeedbackRequests from "./FeedbackRequests";
import {useMediaQuery} from "react-responsive";
import {useState} from "react";
import {addMonths} from "date-fns";
import GenericRibbon from "../Careerhub/GenericRibbon";

const Feedback = () => {
    const isMediumScreen = useMediaQuery({minWidth: 1040}); // Set the breakpoint for md screens
    const [selectedStartDate, setSelectedStartDate] = useState(addMonths(new Date(), -1))
    const [selectedEndDate, setSelectedEndDate] = useState(new Date())

    return (

        <div className="bg-[#f0f1f2] h-screen">
            <GenericRibbon text="My Feedbacks"/>
            <div className="h-screen">
                <div
                    className={`flex ${isMediumScreen ? "gap-x-6" : "flex-col gap-y-6"} justify-center items-center`}>
                    {isMediumScreen ? (
                        <div className="flex space-x-10 w-full mx-6 py-10">
                            <DateRange setSelectedStartDate={setSelectedStartDate}
                                       setSelectedEndDate={setSelectedEndDate}/>
                            <FeedbackRequests startDate={selectedStartDate} endDate={selectedEndDate}/>

                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col w-full">
                                <DateRange setSelectedStartDate={setSelectedStartDate}
                                           setSelectedEndDate={setSelectedEndDate}/>
                                <FeedbackRequests startDate={selectedStartDate} endDate={selectedEndDate}/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Feedback