import {useState} from "react";
import JobType from "../Types/JobType";
import WorkPlaceType from "../Types/WorkPlaceType";
import FixedButtons from "../FixedButtons";
import WorkPlaceTypeDropDown from "../DropDowns/WorkPlaceTypeDropDown";
import JobTypeDropDown from "../DropDowns/JobTypeDropDown";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import saveJobs from "../FetchJobsAndApplications/saveJobs";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const UploadJobs = () => {
    const userInfo = useSelector(state => state.userInfo)
    const [jobDetails, setJobDetails] = useState({
        position: '',
        company: '',
        workPlace: '',
        location: '',
        jobFunction: '',
        jobType: '',
        description: '',
        requirements: ''
    })
    const handleChange = (e)=>{
        const{name, value} = e.target
        setJobDetails((prevDetails) =>({
            ...prevDetails, [name]: value
        }))
    }
    const JobTypes = JobType
    const WorkPlaceTypes = WorkPlaceType

    const navigate = useNavigate()
    const mediaQuery = useMediaQuery({minWidth: "1160px"})
    const textInputQuery = useMediaQuery({minWidth: "680px"})
    const textAreaQuery = useMediaQuery({minWidth: "1100px"})

    const[disable, setDisable] = useState(false)

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
        navigate(-1)
    }
    const handleSave = async () => {
        if(jobDetails.position === '' || jobDetails.company === '' || jobDetails.workPlace === '' || jobDetails.location === '' || jobDetails.jobFunction === ''
            || jobDetails.jobType === '' || jobDetails.description === '' || jobDetails.requirements === ''){
            setDisable(true)
            toast.error('Please fill out all the required fields', {
                onClose: ()=>{
                    setDisable(false)
                }
            });
            return;
        }
        //will evaluate the current date to map to the posted job date
        const date = new Date().toISOString()
        const formattedDate = date ? format(date, 'MM-dd-yyy') : ''

        const requestBody = {
            ...jobDetails, employerEmail: userInfo.usrEmail, postedDate: formattedDate
        }
        const response = await saveJobs(requestBody)
        const text = await response.text()

        if(response.ok){
            setDisable(true)
            toast.success(text, {
                onClose: ()=>{
                    setDisable(false)
                    navigate('/careerhub/my/jobs/uploaded')
                }
            })
        }
        else{
            setDisable(true)
            toast.success(text, {
                onClose: ()=>{
                    setDisable(false)
                    window.location.reload()
                }
            })
        }
    }
    return (
        <div className={`flex flex-col justify-center ${textAreaQuery ? "items-center h-screen" : ""} bg-[#f0f2f5]`}>
            <ToastContainer position="top-center" />
            <div
                className={`w-[1200px] ${mediaQuery ? "h-[780px]" : "h-[1320px]"} h-[750px] border rounded-lg bg-white p-8`}>
                <div className={`${!mediaQuery ? "flex-col" : "flex"}`}>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl">Post a job for free</h1>
                    <p className="text-xl mt-2">Increase the quality of your hire</p>
                </div>
                    <div className={`ml-auto ${!mediaQuery ? "my-4" : ""}`}>
                        <h1>* Required fields</h1>
                    </div>
                </div>
                {/*<div className="flex gap-12 mt-10">*/}
                <div className={`flex ${mediaQuery ? "flex" : "flex-col"} ${mediaQuery ? "gap-4" : "gap-4"} mt-10`}>
                    <div className={`flex ${mediaQuery ? "gap-4" : "gap-4"}`}>
                        <div className={`flex flex-col`}>
                            <label htmlFor="position" className="text-lg mb-2 font-semibold">Job Position*</label>
                            <input value={jobDetails.position} onChange={handleChange} type="text"
                                   name="position" disabled={disable} placeholder={`${textInputQuery ? "Add the position you are hiring for" : "Position you are hiring for"}`}
                                   className={`${textInputQuery ? "w-[301px]" : "w-[200px]"} h-[32px] border border-gray-400 rounded-md p-2 mb-4 mr-4 outline-none focus:border-[#367c2b]`}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="company" className="text-lg mb-2 font-semibold">Company*</label>
                            <input value={jobDetails.company} onChange={handleChange}
                                   type="text" name="company" disabled={disable} placeholder={`${textInputQuery ? "Add the name of the Employer" : "Name of the Employer"}`}
                                   className={`${textInputQuery ? "w-[301px]" : "w-[200px]"} h-[32px] border border-gray-400 rounded-md p-2 mr-4 outline-none focus:border-[#367c2b]`}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="workPlace" className="text-lg mb-2 font-semibold">Workplace type*</label>
                        <WorkPlaceTypeDropDown options={WorkPlaceTypes} setJobDetails={setJobDetails} workPlace={jobDetails.workPlace} disable={disable}/>
                    </div>
                </div>
                <div className={`flex ${mediaQuery ? "flex" : "flex-col"} ${mediaQuery ? "gap-4" : "gap-4"} mt-10`}>
                    <div className={`flex ${mediaQuery ? "gap-4" : "gap-4"}`}>
                        <div className={`flex flex-col`}>
                            <label htmlFor="location" className="text-lg mb-2 font-semibold">Job Location*</label>
                            <input value={jobDetails.location} onChange={handleChange} type="text"
                                   name="location" disabled={disable} placeholder={`${textInputQuery ? "Add the location you are hiring for" : "Location you are hiring for"}`}
                                   className={`${textInputQuery ? "w-[301px]" : "w-[204px]"} h-[32px] border border-gray-400 rounded-md p-2 mb-4 mr-4 outline-none focus:border-[#367c2b]`}/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="function" className="text-lg mb-2 font-semibold">Job Function*</label>
                            <input value={jobDetails.jobFunction} onChange={handleChange} type="text"
                                   name="jobFunction" disabled={disable} placeholder={`${textInputQuery ? "Add the function you are hiring for" : "Function you are hiring for"}`}
                                   className={`${textInputQuery ? "w-[301px]" : "w-[204px]"} h-[32px] border border-gray-400 rounded-md p-2 mr-4 outline-none focus:border-[#367c2b]`}/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="jobType" className="text-lg mb-2 font-semibold">Job type*</label>
                        <JobTypeDropDown options={JobTypes} setJobDetails={setJobDetails} jobType={jobDetails.jobType} disable={disable}/>
                    </div>
                </div>
                <div className={`flex ${textAreaQuery ? "justify-center" : "ml-2 flex-col"} gap-12 mt-8`}>
                    <div>
                        <textarea value={jobDetails.description} onChange={handleChange} name="description"
                                  className="w-[400px] h-[300px] border border-gray-400 focus:border-[#367c2b] outline-none p-4" disabled={disable}
                                  style={{resize: 'none'}} placeholder="Job Descriptions ..."></textarea>
                    </div>
                    <div>
                        <textarea value={jobDetails.requirements} onChange={handleChange} name="requirements"
                                  className="w-[400px] h-[300px] border border-gray-400 focus:border-[#367c2b] outline-none p-4" disabled={disable}
                                  style={{resize: 'none'}} placeholder="Job Requirements ..."></textarea>
                    </div>
                </div>
                <FixedButtons handleClear={handleClear} handleOpen={handleOpen} handleSave={handleSave}/>
            </div>
        </div>
    )
}
export default UploadJobs