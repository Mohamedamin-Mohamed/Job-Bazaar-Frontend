const countActiveApplications = (appliedJobs) => {
    let count = 0
    for (let i = 0; i < appliedJobs.length; i++) {
        if (appliedJobs[i].isActive === 'true') {
            count++
        }
    }
    return count
}
export default countActiveApplications