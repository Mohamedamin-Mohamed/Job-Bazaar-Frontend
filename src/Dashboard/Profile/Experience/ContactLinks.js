import {MdLocationOn} from "react-icons/md";
import {GoMail} from "react-icons/go";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const ContactLinks = ()=>{
    const usrInfo =  useSelector(state => state.userInfo)
    const locationInfo = useSelector(state => state.locationInfo)

    const capitalize = ()=>{
        return usrInfo.usrEmail.charAt(0).toUpperCase() + usrInfo.usrEmail.slice(1);
    }

    return (
        <div className="flex justify-center items-center md:mt-0 mt-16 mb-4">
            <div className="flex flex-col justify-center pl-4 md:w-[840px] mx-2 w-[650px] h-[120px] border mb-4 text-lg" >
            <h1 className="text-xl font-semibold mb-4">Contact & Links</h1>
            <div className="flex mb-1.5">
                <MdLocationOn size={20} className="mr-4" color="gray"/>
                <p>{locationInfo.city},</p>
                <p>{locationInfo.states}</p>
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