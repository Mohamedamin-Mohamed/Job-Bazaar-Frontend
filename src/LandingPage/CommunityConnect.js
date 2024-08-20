import CommunityImage from '../Images/locked-community.webp'
import {useNavigate} from "react-router-dom";
const Community = ({setCommunity})=> {
    const navigate = useNavigate()
    //  <div className="relative">
    //         <div className="absolute inset-0 flex items-start justify-center bg-inherit bg-black ml-12 z-50" onMouseLeave={()=> setCompanies(false)}>
    //             <div className="border-l border-b w-[22%] h-[264px] pl-4 pt-4 bg-white">
    return (
        <div className="relative">
        <div className="absolute inset-0 flex items-start justify-center" onMouseLeave={() => setCommunity(false)}>
            <div className="border-l border-b w-[22%] h-[264px] pl-4 pt-4 bg-white">
                <p className="font-medium">Connect & Network</p>
                <p className="w-[80%]">Engage with industry professionals, join discussions, and expand your professional network within the Job Bazaar community.</p>
                <button
                    className="border border-gray-900 mt-14 ml-10 p-2 rounded-md hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold"
                    onClick={() => navigate('/accounts/login')}>Start using Job Bazaar
                </button>
            </div>
            <div className="border-r border-b h-[264px] bg-white">
                <img src={CommunityImage} alt=""/>
            </div>
        </div>
        </div>
    )
}
export default Community