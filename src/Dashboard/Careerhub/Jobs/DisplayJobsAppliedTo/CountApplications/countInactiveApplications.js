const countInactiveApplications = (appliedJobs) => {
    let count = 0
    for (let i = 0; i < appliedJobs.length; i++) {
        if (appliedJobs[i].applicationStatus !== 'In Progress') {
            count++
        }
    }
    return count
}
export default countInactiveApplications