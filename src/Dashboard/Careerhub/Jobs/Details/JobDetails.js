import {useState} from "react";
import Headers from "./Headers";
import Details from "./Details";
import EditJob from "../Edits/EditJob";
import Apply from "../Applications/Apply";

const JobDetails = ({job, name, role, applied}) => {
    const [editOrApply, setEditOrApply] = useState(false)

    const handleClose = () => {
        setEditOrApply(!editOrApply)
    }

    return (
        <div className="ml-10 w-full">
            {job && (
                <div className="pb-12">
                    <div className="w-[94%] h-[200px] flex flex-col justify-center items-center border-2 rounded-md">
                        <div className="flex space-x-2 text-2xl font-semibold mb-8">
                            <p>{job.jobId}</p>
                            <p>{job.position}</p>
                        </div>
                        <div>
                            <button
                                className={`${applied ? "w-[136px]" : "w-[103px]"} h-[36px] bg-[#ffed00] font-semibold rounded-sm disabled:cursor-not-allowed`}
                                disabled={applied}
                                onClick={()=> setEditOrApply(true)}>{role === 'Employer' ? 'Edit Job' : (applied ? "Already Applied" : 'Apply Now')}
                            </button>
                        </div>
                    </div>
                    <div className={`w-[94%] border rounded-md my-8 `}>
                        <Headers job={job} name={name} role={role}/>
                        <Details job={job} />
                    </div>
                </div>
            )
            }
            {editOrApply ? role === 'Employer' ?
                <EditJob job={job} name={name} handleClose={handleClose} edit={editOrApply}/> :
                <Apply job={job} handleClose={handleClose} open={editOrApply}/> : ""}
        </div>
    )
}
export default JobDetails