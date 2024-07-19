import {useSelector} from "react-redux";
import {MdLocationOn} from "react-icons/md";
import { GoMail } from "react-icons/go";
import {NavLink} from "react-router-dom";

const Experience = ()=>{
    const usrInfo =  useSelector(state => state.userInfo)
    const locationInfo = useSelector(state => state.locationInfo)
    const capitalize = ()=>{
        return usrInfo.usrEmail.charAt(0).toUpperCase() + usrInfo.usrEmail.slice(1);
    }

    return(
        <div className="">
            <div className="flex flex-col justify-center pl-6 md:w-[880px] mx-4 w-[450px] h-[120px] border">
               <h1 className="text-xl font-semibold mb-4">Contact & Links</h1>
                <div className="flex mb-1.5">
                    <MdLocationOn size={20} className="mr-4" color="gray" />
                    <p>{locationInfo.city },</p>
                    <p>{locationInfo.states}</p>
                    <p>{locationInfo.country}</p>
                </div>
                <div className="flex space-x-4">
                    <GoMail size={20} color="gray" />
                    <NavLink to="mailto:mohamedamin204080@gmail.com" className="text-[#367c2b]">{ capitalize }</NavLink>
                </div>
            </div>

        </div>
    )
}
export default Experience