import {useNavigate} from "react-router-dom";

const Interests = () => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate('/careerhub/profile/career')
    }
    return (
        <div className="flex md:flex-row flex-col items-center h-[200px] bg-[#f7f7f7] mt-10">
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