import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const Interests = () => {
    const isMediumScreen = useMediaQuery({minWidth: 1370});
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/careerhub/profile/career')
    }
    return (
        <div className={`flex md:flex-row flex-col ${!isMediumScreen ? "mx-12 p-4 relative" : "flex px-4 pt-3.5 mx-4"} items-center w-[94%] border h-[200px] mt-10`}>
            <div className="flex flex-col p-6">
                <h1 className="mb-4 font-medium md:text-xl">Take 15 mins to set your career interests</h1>
                <p className="md:w-[80%] text-sm md:text-lg">Tell us what you want to achieve in your career, and we'll
                    put a plan together for you.</p>
            </div>
            <div className="flex justify-center items-center">
                <button className="bg-[#ffde00] text-black w-[206px] h-[36px] font-medium mr-4"
                        onClick={handleNavigation}>Set Your Career Interests
                </button>
            </div>
        </div>
    )
}
export default Interests