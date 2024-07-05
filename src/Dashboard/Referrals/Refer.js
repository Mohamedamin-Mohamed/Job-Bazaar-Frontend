import NavBar from "../Careerhub/NavBar";
import ReferralsRibbon from "./ReferralsRibbon";
import {FaCloudArrowUp} from "react-icons/fa6";
import {IoMdShareAlt} from "react-icons/io";
import Image from "../../Images/refer_illustration_cloud.png"
import {useRef, useState} from "react";
import ReferralsLinks from "./ReferralsLinks";
import {useNavigate} from "react-router-dom";

const Refer = () => {
    const[linksShow, setLinksShow] = useState(false)
    const navigate = useNavigate()
    const ref = useRef()
    const handleLinksShow = ()=>{
        setLinksShow(!linksShow)
    }
    const handleClick = ()=>{
        navigate('/careerhub/explore/jobs')
    }
    return (
        <>
            <ReferralsRibbon text={"Refer a Friend"} height={44}/>
            <div className="flex justify-center items-center flex-col h-screen">
                <div className="flex flex-col items-center bg-[#2c8cc90a] border border-dashed border-black w-[300px] h-[470px]">
                    <img src={Image} alt="" className="w-[72px] h-[52px] mt-2 mb-8"/>
                    <h1 className="w-[78%] text-center text-[#367c2b] text-2xl font-semibold">Drop your friend's resume
                        here.</h1>
                    <p className="mt-1 w-[87%] text-center">Please note: If the friend you want to refer is located in
                        Europe or Canada, only use the <strong>Share Link with your friends</strong> functionality.
                        Due to data protection requirements, it is therefore not allowed to upload the resume.</p>
                    <p className="mb-1 mt-1">(doc, docx, pdf or txt)</p>
                    <p>or</p>

                    <button
                        className="flex justify-center text-[#367c2b] font-medium mr-12 w-36 mb-8 bg-white border border-[#367c2b] ml-16 mt-4 pl-3 py-1 hover:bg-[#367c2b] hover:text-white">BROWSE
                        FILES
                    </button>
                </div>
                <div
                    className="flex flex-col justify-center items-center mt-6 w-[440px] h-[100px] bg-[#2c8cc90a] border border-dashed border-black rounded-2xl ">
                    <div className="p-1">
                        <h1 className="text-[#4f5666]">If you are an employee from Europe or Canada</h1>
                        <div className="flex mt-2">
                            <h1 className="text-[#367c2b] font-semibold text-2xl">Share link with your friends</h1>
                            <IoMdShareAlt color="gray" className="bg-white rounded ml-3 p-1 w-[44px] h-[36px] hover:cursor-pointer" onClick={handleLinksShow}/>
                        </div>
                        {linksShow && <ReferralsLinks handleLinksShow={handleLinksShow} />}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                    <p>- Or -</p>
                    <button className="flex justify-center text-[#367c2b] font-medium mr-12 w-48 mb-8 bg-white border border-[#367c2b] ml-16 mt-4 pl-3 py-1 hover:bg-[#367c2b] hover:text-white" onClick={ handleClick }>Skip
                        And Browse Jobs
                    </button>
                </div>
            </div>
        </>
    )
}
export default Refer