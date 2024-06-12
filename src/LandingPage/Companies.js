import CommunityImage from '../Images/locked-companies.webp'
import {useNavigate} from "react-router-dom";
const Companies = ({setCompanies})=>{
    const navigate = useNavigate()
    return(
        <div className="fixed inset-0 flex items-start justify-start z-50 mt-24 bg-inherit bg-black ml-80" onMouseLeave={()=> setCompanies(false)}>
            <div className="border-l border-b w-[28%] h-[245px] pl-4 pt-4">
                <p className="font-medium">Read millions of reviews</p>
                <p className="w-[80%]">Read anonymous reviews on over 600,000 companies worldwide from the people that work there.</p>
                <button className="border border-gray-500 mt-8  ml-10 p-2.5 rounded-md hover:bg-blue-600" onClick={()=> navigate('/accounts/login')}>Start using Job Bazaar</button>
            </div>
            <div className="border-r border-b h-[245px]">
                <img src={CommunityImage} alt="" className="mr-4"/>
            </div>

        </div>
    )
}
export default Companies