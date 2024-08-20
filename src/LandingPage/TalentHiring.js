import CommunityImage from '../Images/locked-companies.webp'
import {useNavigate} from "react-router-dom";

const TalentHiring = ({setCompanies}) => {
    const navigate = useNavigate()
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-start justify-center bg-inherit bg-black ml-12 z-50"
                 onMouseLeave={() => setCompanies(false)}>
                <div className="border-l border-b w-[25%] h-[264px] pl-4 pt-4 bg-white">
                    <p className="font-medium">Hire Talent</p>
                    <p className="w-[80%]">Post job openings, review applications, and find the perfect candidates to
                        grow your team.</p>
                    <button
                        className="border border-gray-500 mt-16 ml-10 p-2.5 rounded-md hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold"
                        onClick={() => navigate('/accounts/login')}>Start using Job Bazaar
                    </button>
                </div>
                <div className="border-r border-b h-[264px] bg-white">
                    <img src={CommunityImage} alt="" className="mr-4"/>
                </div>
            </div>
        </div>
    )
}
export default TalentHiring