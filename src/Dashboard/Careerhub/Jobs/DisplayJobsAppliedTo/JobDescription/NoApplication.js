import Image from "../../../../../Images/no_application_banner.svg";
import {NavLink} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const NoApplication = () => {
    const mediaQuery = useMediaQuery({minWidth: "1464px"})
    const mediaQuery2 = useMediaQuery({minWidth: "768px"})
    return (
        // <div className={`flex flex-col ${mediaQuery ? "mx-6 mt-20 h-[580px]" : "mx-10 mt-6"} ${!mediaQuery2 ? "mt-8" : ""} bg-white p-6 border rounded-xl mb-8`}>
        <div
            className={`flex flex-col justify-center items-center w-full ${!mediaQuery2 ? "mt-8" : ""} border rounded-lg bg-white h-[750px] mt-6`}>
            <img src={Image} alt=""/>
            <p>This job has been deleted by the employer</p>
            <NavLink to="/careerhub/explore/jobs" className=" flex justify-center items-center border border-[#367c2b] text-[#367c2b] hover:bg-[#367c2b]
            hover:text-white w-[180px] h-[36px] mt-4 rounded-sm">Search for Jobs</NavLink>
        </div>
    )
}
export default NoApplication