import Image from "../../../../Images/no_application_banner.svg"
import {NavLink} from "react-router-dom";

const NoApplication = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-[348px]">
            <img src={Image} alt=""/>
            <p>You have no active jobs</p>
            <NavLink to="/careerhub/jobs/upload" className=" flex justify-center items-center border border-[#367c2b] text-[#367c2b] hover:bg-[#367c2b]
            hover:text-white w-[180px] h-[36px] mt-4 rounded-sm">Upload a Job</NavLink>
        </div>
    )
}
export default NoApplication