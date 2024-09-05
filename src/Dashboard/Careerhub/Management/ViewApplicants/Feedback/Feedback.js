import uploadFeedback from "../../../Jobs/FetchJobsAndApplications/uploadFeedback";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {format} from "date-fns";
import updateApplication from "../../../Jobs/FetchJobsAndApplications/updateApplication";

const Feedback = ({jobId, applicantEmail}) => {
    const navigate = useNavigate()

    const handleCase = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
    const handleFeedbackSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const date = new Date()
        const formattedDate = format(date, 'MM-yyyy-dd')
        const isRejected = formData.get('status') === 'rejected'
        const requestBody = {
            'applicantEmail': applicantEmail,
            'jobId': jobId,
            'feedbackDate': formattedDate,
            'feedback': formData.get('feedback'),
            'status': handleCase(formData.get('status'))
        }
        try {
            if (isRejected) {
                const [updateResponse, feedbackResponse] = await Promise.all([
                    updateApplication(applicantEmail, jobId, "Declined", new AbortController()),
                    uploadFeedback(requestBody, new AbortController())])
                const toastType = updateResponse.ok && feedbackResponse.ok ? toast.success : toast.error
                const text = await feedbackResponse.text()
                toastType(text, {
                    onClose: () => {
                        navigate('/careerhub/employer/management')
                    }
                })
            } else {
                const [updateResponse, feedbackResponse] = await Promise.all([
                    updateApplication(applicantEmail, jobId, requestBody.status, new AbortController()),
                    uploadFeedback(requestBody, new AbortController())])
                const toastType = updateResponse.ok && feedbackResponse.ok ? toast.success : toast.error
                const text = await feedbackResponse.text()
                toastType(text, {
                    onClose: () => {
                        navigate('/careerhub/employer/management')
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="h-[400px] w-full">
            <div className="w-full h-[100%] bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Provide Feedback</h2>
                <form id="feedbackForm" onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
                        <textarea name="feedback"
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                  rows="4" placeholder="Enter your feedback"></textarea>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status"
                                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="received">Received</option>
                            <option value="inReview">In Review</option>
                            <option value="interview Scheduled">Interview Scheduled</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit"
                                className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition">Submit
                            Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Feedback