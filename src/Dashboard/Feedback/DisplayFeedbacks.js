import {useMediaQuery} from "react-responsive";

const DisplayFeedbacks = ({feedbacks}) => {
    const isMediumScreen = useMediaQuery({minWidth: 1040}); // Set the breakpoint for md screens

    return (
        <div>
            {feedbacks.map((feedback) => (
                <div key={feedback.jobId}
                     className={`flex justify-between list-none w-[95%] space-x-4 mt-3 border-t pb-4 pt-4`}>
                    <p>{feedback.jobId}</p>
                    {isMediumScreen ? <>
                            <p>{feedback.feedbackDate}</p>
                            <p className="w-[24%]">{feedback.feedback}</p>
                        </>
                        :
                        <p>{feedback.feedbackDate}</p>
                    }

                    <p>{feedback.status}</p>
                </div>
            ))
            }
        </div>
    )
}
export default DisplayFeedbacks