import {useEffect, useState} from "react";
import JobType from "../Types/JobType";
import WorkPlaceType from "../Types/WorkPlaceType";
import FixedButtons from "../FixedButtons";
import WorkPlaceTypeDropDown from "../DropDowns/WorkPlaceTypeDropDown";
import JobTypeDropDown from "../DropDowns/JobTypeDropDown";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import saveJobs from "../FetchJobsAndApplications/saveJobs";
import {TfiClose} from "react-icons/tfi";

const EditJob = ({job, name, handleClose, edit}) => {
    const [jobDetails, setJobDetails] = useState({
        position: job.position,
        company: job.company,
        workPlace: job.workPlace,
        location: job.location,
        jobFunction: job.jobFunction,
        jobType: job.jobType,
        description: job.description,
        requirements: job.requirements
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setJobDetails((prevDetails) => ({
            ...prevDetails, [name]: value
        }))
    }
    const JobTypes = JobType
    const WorkPlaceTypes = WorkPlaceType

    const navigate = useNavigate()
    const [disable, setDisable] = useState(false)

    const handleClear = () => {
        setJobDetails({
            position: '',
            company: '',
            workPlace: '',
            location: '',
            jobFunction: '',
            jobType: '',
            description: '',
            requirements: ''
        })
    }
    const handleOpen = () => {
        handleClose()
    }
    const handleSave = async () => {
        if (jobDetails.position === '' || jobDetails.company === '' || jobDetails.workPlace === '' || jobDetails.location === '' || jobDetails.jobFunction === ''
            || jobDetails.jobType === '' || jobDetails.description === '' || jobDetails.requirements === '') {
            setDisable(true)
            toast.error('Please fill out all the required fields', {
                onClose: () => {
                    setDisable(false)
                }
            });
            return;
        }
        const requestBody = {
            ...jobDetails, employerEmail: job.employerEmail, jobId: job.jobId
        }

        const response = await saveJobs(requestBody)
        const text = await response.text()

        if (response.ok) {
            setDisable(true)
            toast.success(text, {
                onClose: () => {
                    setDisable(false)
                    handleClose()
                    navigate(`/careerhub/my/jobs/uploaded/${job.jobId}`)
                }
            })
        } else {
            setDisable(true)
            toast.success(text, {
                onClose: () => {
                    setDisable(false)
                    window.location.reload()
                }
            })
        }
    }
    useEffect(() => {
        const scrollHandle = ()=>{
            document.body.style.overflow = edit ? 'hidden' : ''
        }
        scrollHandle()
        return ()=>{
            document.body.style.overflow = ''
        }
    }, [edit]);
    return (
        <div className="fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50 z-50">
            <div className="bg-white w-[630px] h-[720px] p-4 mx-12 rounded-md">
                    <TfiClose color="gray" size={24} className="ml-auto cursor-pointer hover:rounded-full" onClick={handleClose}/>
                <div className="flex-col">
                        <div>
                            <h1 className="font-semibold text-xl">Welcome {name.firstName} {name.lastName}</h1>
                            <p className="font-medium text-lg mt-2">Edit your uploaded job</p>
                    </div>
                    <div className="mt-4">
                        <h1>* Required fields</h1>
                    </div>
                </div>
                {/*{ start of position and company }*/}
                <div className="w-[600px] h-[490px] overflow-y-scroll">
                <div className="flex flex-col gap-4 mt-3">
                    <div className="flex my-6">
                        <div className={`flex flex-col`}>
                            <label htmlFor="position" className="text-lg mb-2 font-semibold">Job Position*</label>
                            <input value={jobDetails.position} onChange={handleChange} type="text"
                                   name="position" disabled={disable}
                                   placeholder="Position you are hiring for"
                                   className="w-[301px] h-[32px] border border-gray-400 rounded-md p-2 mb-4 mr-4 outline-none focus:border-[#367c2b]"/>
                        </div>
                        <div className="flex flex-col ml-3">
                            <label htmlFor="company" className="text-lg mb-2 font-semibold">Company*</label>
                            <input value={jobDetails.company} onChange={handleChange}
                                   type="text" name="company" disabled={disable}
                                   placeholder="Name of the Employer"
                                   className="w-[230px] h-[32px] border border-gray-400 rounded-md p-2 mr-4 outline-none focus:border-[#367c2b]"/>
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="flex flex-col">
                            <label htmlFor="workPlace" className="text-lg mb-2 font-semibold">Workplace type*</label>
                            <WorkPlaceTypeDropDown options={WorkPlaceTypes} setJobDetails={setJobDetails}
                                                   workPlace={jobDetails.workPlace} disable={disable}/>
                        </div>
                        <div className="flex flex-col ml-8">
                            <label htmlFor="location" className="text-lg mb-2 font-semibold">Job Location*</label>
                            <input value={jobDetails.location} onChange={handleChange} type="text"
                                   name="location" disabled={disable} placeholder="Location you are hiring for"
                                   className="w-[230px] h-[32px] border border-gray-400 rounded-md p-2 mb-4 mr-4 outline-none focus:border-[#367c2b]"/>
                        </div>
                    </div>
                </div>

                {/*{start of location, function and job type}*/}
                <div className="flex my-6">
                    <div className="flex flex-col">
                        <label htmlFor="jobType" className="text-lg mb-2 font-semibold">Job type*</label>
                        <JobTypeDropDown options={JobTypes} setJobDetails={setJobDetails}
                                         jobType={jobDetails.jobType} disable={disable}/>
                    </div>
                    <div className="flex flex-col ml-8">
                        <label htmlFor="jobFunction" className="text-lg mb-2 font-semibold">Job Function</label>
                        <input value={jobDetails.jobFunction} onChange={handleChange}
                               type="text" name="jobFunction" disabled={disable}
                               placeholder="Function you are hiring for"
                               className="w-[230px] h-[32px] border border-gray-400 rounded-md p-2 mr-4 outline-none focus:border-[#367c2b]"/>
                    </div>
                </div>
                <div className="flex justify-center ml-2 gap-12 mt-4">
                    <div>
                        <textarea value={jobDetails.description} onChange={handleChange} name="description"
                                  className="w-[250px] h-[250px] border border-gray-400 focus:border-[#367c2b] outline-none p-4"
                                  disabled={disable}
                                  style={{resize: 'none'}} placeholder="Job Descriptions ..."></textarea>
                    </div>
                    <div>
                        <textarea value={jobDetails.requirements} onChange={handleChange} name="requirements"
                                  className="w-[250px] h-[250px] border border-gray-400 focus:border-[#367c2b] outline-none p-4"
                                  disabled={disable}
                                  style={{resize: 'none'}} placeholder="Job Requirements ..."></textarea>
                    </div>
                </div>
                </div>
                <FixedButtons handleClear={handleClear} handleOpen={handleOpen} handleSave={handleSave}/>
            </div>
        </div>
    )
}
export default EditJob