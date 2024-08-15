import NavBar from "../../NavBar";
import UploadJobs from "./UploadJobs";
import Display404EmployerOrApplicant from "../DisplayJobsAppliedTo/Display404EmployerOrApplicant";

const Jobs = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role

    return (
        <>
            {role === 'Applicant' ?
                <Display404EmployerOrApplicant role={role}/>
                :
                <>
                    <NavBar/>
                    <UploadJobs/>
                </>
            }
        </>
    )
}
export default Jobs