import {format} from "date-fns";

const ApplyToJob = async (controller, jobApplication, user) => {
    const token = localStorage.getItem('token')
    const formData = new FormData();

    formData.append("applicantEmail", user.email);
    formData.append("employerEmail", jobApplication.employerEmail);
    formData.append("jobId", jobApplication.jobId);
    formData.append("position", jobApplication.position)
    formData.append("resumeName", jobApplication.resume.name)
    formData.append("resumeFile", jobApplication.resume.file)
    formData.append("country", jobApplication.country)
    formData.append("city", jobApplication.city)
    formData.append("postalCode", jobApplication.postalCode)
    formData.append("gender", jobApplication.gender)
    formData.append("nationality", jobApplication.nationality)
    formData.append("additionalDocName", jobApplication.additionalDocument.name)
    formData.append("additionalDocFile", jobApplication.additionalDocument.file)
    formData.append("employerContact", jobApplication.employerContact)
    formData.append("firstName", user.firstName)
    formData.append("applicationStatus", "In Progress")
    formData.append("isActive", "true")
    formData.append("lastName", user.lastName)

    const date = new Date().toISOString()
    const formattedDate = date ? format(date, 'MM-dd-yyy') : ''
   formData.append("applicationDate", formattedDate)

    if (token) {
        return await fetch('http://localhost:8080/api/applications/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
            signal: controller.signal
        })
    }
}
export default ApplyToJob