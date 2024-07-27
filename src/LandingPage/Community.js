import CommunityImage from '../Images/locked-community.webp'
import {useNavigate} from "react-router-dom";
const Community = ({setCommunity})=>{
    const navigate = useNavigate()

    return(
        <div className="fixed inset-0 flex items-start justify-center mt-24" onMouseLeave={()=> setCommunity(false)}>
            <div className="border-l border-b w-[22%] h-[264px] pl-4 pt-4 bg-white">
            <p className="font-medium">Your people work here</p>
            <p className="w-[80%]">Connect anonymously with professionals about work, pay, life and more</p>
            <button className="border border-gray-900 mt-14 ml-10 p-2 rounded-md hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold" onClick={()=>navigate('/accounts/login')}>Start using Job Bazaar</button>
            </div>
            <div className="border-r border-b h-[264px] bg-white">
                <img src={CommunityImage} alt=""/>
            </div>
            </div>
    )
}
export default Community