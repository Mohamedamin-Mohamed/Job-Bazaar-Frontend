import {MdLocationOn} from "react-icons/md";
import {GoMail} from "react-icons/go";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {useMediaQuery} from "react-responsive";

const ContactLinks = ()=>{
    const usrInfo =  useSelector(state => state.userInfo)
    const locationInfo = useSelector(state => state.locationInfo)
    const mediaQuery = useMediaQuery({minWidth: "790px"})

    const capitalize = ()=>{
        return usrInfo.usrEmail.charAt(0).toUpperCase() + usrInfo.usrEmail.slice(1);
    }

    return (
        <div className="flex ml-[40px] md:mt-0 mt-16 mb-4">
            <div className={`flex flex-col justify-center pl-6 md:w-[540px] md:mt-4 mx-2 w-[650px] h-[140px] border mb-4 text-lg ${mediaQuery ? "bg-[#f7f7f7]" : ""}`} >
            <h1 className="text-xl font-semibold mb-4">Contact & Links</h1>
            <div className="flex mb-1.5 text-[#4f5666] font-semibold text-lg">
                <MdLocationOn size={20} className="mr-4" color="gray"/>
                <p>{locationInfo.city},</p>
                <p className="mx-1">{locationInfo.states},</p>
                <p>{locationInfo.country}</p>
            </div>
            <div className="flex space-x-4">
                <GoMail size={20} color="gray"/>
                <NavLink to="mailto:mohamedamin204080@gmail.com" className="text-[#367c2b]">{capitalize}</NavLink>
            </div>
            </div>
        </div>
    )
}
export default ContactLinks;