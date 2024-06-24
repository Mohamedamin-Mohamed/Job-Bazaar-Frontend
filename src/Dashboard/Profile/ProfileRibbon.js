import {MdLocationOn} from "react-icons/md";
import {useSelector} from "react-redux";

const ProfileRibbon = () =>{
    const locationInfo = useSelector(state => state.locationInfo)
    const usrInfo = useSelector(state => state.userInfo)
    const abbreviatedName = usrInfo.firstName.substring(0,1) + usrInfo.lastName.substring(0,1)
    const fullName = usrInfo.firstName + ' ' + usrInfo.lastName
    return(
        <div>
            <div className="relative mx-10 h-60 flex items-center border-b justify-center overflow-hidden mt-0.5">
                <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full bg-[#ffde00]" style={{clipPath: 'polygon(0 0, 100% 0, 0 100%'}}></div>
                    <div className="w-1/2 h-full bg-[#367c2b]"
                         style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%'}}></div>
                </div>
                <div className="relative z-10 flex items-center space-x-4">
                    <div
                        className="w-24 h-24 rounded-full bg-[#367c2b] absolute items-center justify-center ml-16 text-white text-xl font-bold">
                        <p className="flex justify-center mt-8 text-2xl">{abbreviatedName}</p>
                    </div>
                    <div className="bg-white border w-[448px] h-[180px] mt-36">
                        <div className="flex flex-col ml-10 mt-16 ">
                            <h1 className="text-2xl font-medium">{fullName}</h1>
                            <div className="flex text-[#4f5666] mt-1 space-x-1 font-medium">
                                <MdLocationOn size={20} />
                                <p>{locationInfo.city},</p>
                                <p>{locationInfo.states}</p>
                                <p>{locationInfo.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileRibbon