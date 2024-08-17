import {useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const ViewApplication = () => {
    const location = useLocation()
    const {application} = location.state || {}

    if (!application) {
        toast.error("No application data found.")
    }
    return (
        <div className="flex justify-center items-center">
            <ToastContainer position="top-center"/>
            <div className="flex space-x-4">
                <h1>{application.jobId}</h1>
                <h1>{application.position}</h1>
                <h1>- Submitted Application</h1>
            </div>
        </div>
    )
}
export default ViewApplication