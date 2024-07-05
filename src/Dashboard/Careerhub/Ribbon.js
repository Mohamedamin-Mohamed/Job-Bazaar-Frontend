import {useSelector} from "react-redux";
import NavBar from "./NavBar";

const Ribbon = ()=>{
    const usrInfo = useSelector(state => state.userInfo)
    const locationInfo = useSelector(state => state.locationInfo)
    const abbreviatedName = usrInfo.firstName.substring(0,1) + usrInfo.lastName.substring(0,1)

    return (
        <div>
            <div className="relative mx-10 h-60 flex overflow-hidden mt-0.5">
                <div className="absolute inset-0 flex">
                    <div className="w-1/2 h-full bg-[#ffde00]"
                         style={{clipPath: 'polygon(0 0, 100% 0, 0 100%'}}></div>
                    <div className="w-1/2 h-full bg-[#367c2b]"
                         style={{clipPath: 'polygon(0 0, 100% 0, 100% 100%'}}></div>
                </div>
                <div className="ml-20 mt-20 z-50">
                    <div className="absolute top-0 mt-28 ml-36">
                        <h1 className="text-xl font-bold">Hi {usrInfo.firstName}</h1>
                        <p className="text-[#757575] font-bold text-sm text-center">Welcome to your Career Hub</p>
                    </div>
                    <h1 className="w-24 h-24 rounded-full bg-[#367c2b] flex items-center justify-center text-white text-2xl font-bold">{abbreviatedName}</h1>
                </div>

            </div>
        </div>
    )
}
export default Ribbon