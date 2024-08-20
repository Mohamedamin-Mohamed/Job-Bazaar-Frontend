import CommunityImage from '../Images/locked-jobs.webp'
import {useNavigate} from "react-router-dom";

const Jobs = ({setJobs})=> {
    const navigate = useNavigate()
    return (
        <div className="relative">
        <div className="absolute inset-0 flex items-start justify-center bg-inherit bg-black ml-12"
             onMouseLeave={() => setJobs(false)}>
            <div className="border-l border-b w-[26%] h-[264px] pl-4 pt-4 bg-white">
                <p className="font-medium">Explore Opportunities</p>
                <p>Discover job listings tailored to your skills and interests, and apply directly through our streamlined platform.</p>
                <button
                    className="border border-gray-500 mt-16 ml-10 p-2.5 rounded-md hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold"
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
export default Jobs