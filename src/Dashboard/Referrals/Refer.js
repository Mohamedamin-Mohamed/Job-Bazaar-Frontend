import Ribbon from "../Careerhub/GenericRibbon";
import {IoMdShareAlt} from "react-icons/io";
import Image from "../../Images/refer_illustration_cloud.png"
import {useState} from "react";
import ReferralsLinks from "./ReferralsLinks";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import addReferral from "../Careerhub/Jobs/FetchJobsAndApplications/addReferral";
import {toast, ToastContainer} from "react-toastify";

const Refer = () => {
    const [linksShow, setLinksShow] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const role = user.role
    const handleLinksShow = () => {
        setLinksShow(!linksShow)
    }
    const handleClick = () => {
        if (role === 'Employer')
            navigate('/careerhub/my/jobs/uploaded')
        else
            navigate('/careerhub/explore/jobs')
    }
    const handleReferral = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        const fullName = user.firstName + " " + user.lastName
        const date = new Date()
        const formattedDate = format(date, 'MM-yyyy-dd')

        formData.append("referrerEmail", user.email)
        formData.append("referrerName", fullName)
        formData.append("fileName", file.name)
        formData.append("createdAt", formattedDate)
        formData.append("refereeResumeFile", file)
        try {
            const response = await addReferral(formData, new AbortController())
            if (!response.ok) {
                throw new Error("Couldn't add referral")
            } else {
                const text = await response.text()
                toast.success(text, {
                    onClose: () => {
                        navigate('/careerhub/myreferrals')
                    }
                })
            }
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <>
            <Ribbon text={"Refer a Friend"}/>
            <div className="flex items-center flex-col h-screen mt-4">
                <ToastContainer position="top-center"/>
                <div
                    className="flex flex-col items-center bg-[#2c8cc90a] border border-dashed border-black w-[300px] h-[470px]">
                    <img src={Image} alt="" className="w-[72px] h-[52px] mt-2 mb-8"/>
                    <h1 className="w-[78%] text-center text-[#367c2b] text-2xl font-semibold">Drop your friend's resume
                        here.</h1>
                    <p className="mt-1 w-[87%] text-center">Please note: If the friend you want to refer is located in
                        Europe or Canada, only use the <strong>Share Link with your friends</strong> functionality.
                        Due to data protection requirements, it is therefore not allowed to upload the resume.</p>
                    <p className="mb-1 mt-1">(doc, docx, pdf or txt)</p>
                    <p>or</p>
                    <input type="file" id="refer" className="hidden" onChange={(event) => handleReferral(event)}/>
                    <label htmlFor="refer"
                           className="flex justify-center text-[#367c2b] font-medium mr-12 w-36 mb-8 bg-white border border-[#367c2b] ml-16 mt-4 pl-3 py-1 hover:bg-[#367c2b] hover:text-white cursor-pointer">BROWSE
                        FILES
                    </label>
                </div>
                <div
                    className="flex flex-col justify-center items-center mt-6 w-[440px] h-[100px] bg-[#2c8cc90a] border border-dashed border-black rounded-2xl ">
                    <div className="p-1">
                        <h1 className="text-[#4f5666]">If you are an employee from Europe or Canada</h1>
                        <div className="flex mt-2">
                            <h1 className="text-[#367c2b] font-semibold text-2xl">Share link with your friends</h1>
                            <IoMdShareAlt color="gray"
                                          className="bg-white rounded ml-3 p-1 w-[44px] h-[36px] hover:cursor-pointer"
                                          onClick={handleLinksShow}/>
                        </div>
                        {linksShow && <ReferralsLinks handleLinksShow={handleLinksShow}/>}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <p>- Or -</p>
                    <button
                        className={`flex justify-center text-[#367c2b] font-medium mr-12 ${role === 'Employer' ? 'w-64' : 'w-48'} w-48 mb-8 bg-white border border-[#367c2b] ml-16 mt-4 pl-3 py-1 hover:bg-[#367c2b] hover:text-white`}
                        onClick={handleClick}>
                        {`${role === 'Employer' ? 'Skip and Browse Uploaded Jobs' : 'Skip and Browse Jobs'}`}
                    </button>
                </div>
            </div>
        </>
    )
}
export default Refer