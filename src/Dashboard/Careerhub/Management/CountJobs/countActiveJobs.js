const countActiveJobs = (uploadedJobs)=>{
    let count = 0
    for (let i = 0; i < uploadedJobs.length; i++) {
        if (uploadedJobs[i].jobStatus === 'active') {
            count++
        }
    }
    return count
}
export default countActiveJobs
