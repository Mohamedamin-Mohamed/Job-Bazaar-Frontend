const countInActiveJobs = (uploadedJobs)=>{
    let count = 0
    for (let i = 0; i < uploadedJobs.length; i++) {
        if (uploadedJobs[i].jobStatus === 'inActive') {
            count++
        }
    }
    return count
}
export default countInActiveJobs