import Feedback from "./Feedback/Feedback";
import {useMediaQuery} from "react-responsive";
import Details from "./Details";

const ApplicantDetails = ({applicant, onClose, handleResume}) => {
    const mediaQuery = useMediaQuery({minWidth: 950})

    return (
        <div className={`flex ${mediaQuery ? "flex-row" : "flex-col space-y-10"} inset-0 justify-center items-center`}>
            <Details applicant={applicant} onClose={onClose} handleResume={handleResume} />
            <Feedback applicantEmail={applicant.applicantEmail} jobId={applicant.jobId}/>
        </div>
    );
}
export default ApplicantDetails