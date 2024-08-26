import getJobExists from "../../FetchJobsAndApplications/getJobExists";
import updateApplication from "../../FetchJobsAndApplications/updateApplication";

const updateApplicationStatus = async (appliedJobs) => {
    const abortController = new AbortController();
    try {
        await Promise.all(
            Object.values(appliedJobs).map(async (application) => {
                try {
                    const jobExistsResponse = await getJobExists(
                        application.employerEmail,
                        application.jobId,
                        abortController.signal
                    );

                    if (jobExistsResponse.ok) {
                        const jobExists = await jobExistsResponse.json();
                        if (!jobExists) {
                            console.log(application.applicationStatus)
                            //check if applicationStatus has the value job withdrawn
                            const applicationStatusUpdated = application.applicationStatus === 'Job Withdrawn'

                            if (!applicationStatusUpdated) {
                                // Update application status to 'Job withdrawn'
                                const applicationStatus = "Job Withdrawn";
                                const updateResponse = await updateApplication(
                                    application.applicantEmail,
                                    application.jobId,
                                    applicationStatus,
                                    abortController.signal
                                );

                                if (!updateResponse.ok) {
                                    const data = await updateResponse.json();
                                    throw new Error(data);
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            })
        );
    } catch (err) {
        console.error("Error updating application statuses:", err);
    }
};

export default updateApplicationStatus;
