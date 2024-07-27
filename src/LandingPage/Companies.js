import CommunityImage from '../Images/locked-companies.webp'
import {useNavigate} from "react-router-dom";
const Companies = ({setCompanies})=>{
    const navigate = useNavigate()
    return(

        <div className="fixed inset-0 flex items-start justify-center mt-24 bg-inherit bg-black ml-12" onMouseLeave={()=> setCompanies(false)}>
            <div className="border-l border-b w-[22%] h-[264px] pl-4 pt-4 bg-white">
                <p className="font-medium">Read millions of reviews</p>
                <p className="w-[80%]">Read anonymous reviews on over 600,000 companies worldwide from the people that work there.</p>
                <button className="border border-gray-500 mt-16 ml-10 p-2.5 rounded-md hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold" onClick={()=> navigate('/accounts/login')}>Start using Job Bazaar</button>
            </div>
            <div className="border-r border-b h-[264px] bg-white">
                <img src={CommunityImage} alt="" className="mr-4"/>
            </div>

        </div>
    )
}
export default Companies