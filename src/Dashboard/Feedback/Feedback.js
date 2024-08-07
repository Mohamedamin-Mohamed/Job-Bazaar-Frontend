import NavBar from "../Careerhub/NavBar";
import 'react-datepicker/dist/react-datepicker.css'
import DateRange from "./DateRange";
import Positions from "./Positions";
import FeedbackRequests from "./FeedbackRequests";
import {useMediaQuery} from "react-responsive";

const Feedback = () => {
    const isMediumScreen = useMediaQuery({minWidth: 900}); // Set the breakpoint for md screens

    return (

        <div className="ml-3">
            <NavBar/>
            <div>
                <div
                    className={`flex ${isMediumScreen ? "gap-x-6" : "flex-col gap-y-6"} justify-center items-center mt-6`}>
                    {isMediumScreen ? (
                        <>
                            <div className="flex flex-col justify-center items-center ml-20">
                                <div>
                                    <h1 className="text-3xl font-semibold ml-2 mb-6">Feedback Center</h1>
                                    <DateRange/>
                                    <Positions/>
                                </div>
                            </div>
                            <div className="border mt-36 p-3 mr-24">
                                <FeedbackRequests/>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={"flex flex-col"}>
                                <h1 className="text-3xl font-semibold ml-2">Feedback Center</h1>
                                <DateRange/>
                                <Positions/>
                                <FeedbackRequests/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Feedback