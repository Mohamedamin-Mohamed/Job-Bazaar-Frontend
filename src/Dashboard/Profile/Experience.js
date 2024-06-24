import {useSelector} from "react-redux";
import {MdLocationOn} from "react-icons/md";
import { GoMail } from "react-icons/go";

const Experience = ()=>{
    const usrInfo =  useSelector(state => state.userInfo)
    const locationInfo = useSelector(state => state.location)
    return(
        <div>
            <div className="flex flex-col">
               <h1>Contact & Links</h1>
                <div className="flex space-x-4">
                    <MdLocationOn size={20} />
                    <p>{locationInfo.city},</p>
                    <p>{locationInfo.states}</p>
                    <p>{locationInfo.country}</p>
                </div>
                <div className="flex space-x-4">
                    <GoMail size={20} />
                    <p>{usrInfo.usrEmail}</p>
                </div>
            </div>

        </div>
    )
}
export default Experience