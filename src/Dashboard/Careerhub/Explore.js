import { PiSuitcaseSimpleLight } from "react-icons/pi";
import { GoProject } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const Explore = ()=>{
    const[arrowShow, setArrowShow] = useState(false)
    const navigate = useNavigate()
    const handleExplore = (text)=>{
        if(text === 'jobs')
        navigate('explore/jobs')
        else
            navigate('explore/projects')
    }
    return(
        <div className="flex flex-col md:flex-row w-full ml-8">
        <div className={` ${arrowShow ? "h-[94px]" : "h-[440px]"} border p-6 mr-8 mt-10 `}>
            <div className="border-b pb-4">
                <div className="flex">
                    <div className="flex flex-col w-[760px]">
                        <h1 className="text-black font-medium text-lg">Get more from Career Hub</h1>
                        <p className="text-[#9b9b9b] font-medium">Explore the many ways you can grow here</p>
                    </div>
                    <div className="ml-auto mr-4">
                        {!arrowShow ? <IoIosArrowUp size={20} className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100" onClick={()=> setArrowShow(!arrowShow)}/> :
                            <IoIosArrowDown size={20} className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100" onClick={()=> setArrowShow(!arrowShow)}/>}
                    </div>
                </div>

            </div>
            { !arrowShow && (
                <div className={`flex flex-col md:flex-row gap-6`}>
                    <div className="border w-full md:w-[400px] h-[288px] bg-[#fff89c] p-6 text-[#5c5500] mt-8">
                        <div className="flex flex-col mb-6">
                            <h1 className="font-medium text-lg">Jobs</h1>
                            <p className="font-semibold">Browse opportunities for you or friends</p>
                        </div>
                        <div className="flex flex-col mb-6">
                            <p className="font-semibold">Posted recently</p>
                            <h1 className="font-medium text-lg">2024060 Engineer Product I - Robotics...</h1>
                        </div>
                        <div className="flex">
                            <div className="w-[130px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm"><p>Computer S..</p></div>
                            <div className="w-[130px] h-[26px] border px-1 mx-2 bg-white text-[#9b9b9b] font-medium text-sm"><p>Electrical Engi...</p></div>
                            <div className="w-[130px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm"><p>Software Engi..</p></div>
                        </div>
                        <button className="bg-white w-[100%] mt-5 p-2 text-[#9b9b9b]" onClick={()=>handleExplore('jobs')}>Explore Jobs</button>
                    </div>
                    <div className="bg-[#cacffc] mt-8  border w-full md:w-[400px] h-[288px] p-6">
                        <div className="flex">
                            <h1 className="font-medium text-lg text-[#2b3271]">Projects</h1>
                            <p className="bg-[#f1f2ff] px-0.5 ml-2 h-[22px]">1</p>
                        </div>
                        <p className="font-medium text-[#2b3271] mb-6">Get hands-on experience</p>
                        <div className="flex flex-col">
                            <p className="text-sm text-[#2b3271]">Recommended for you</p>
                            <h1 className="font-medium text-lg text-[#2b3271]">Project Marketplace Onboarding</h1>
                        </div>
                        <button className="bg-white w-[100%] mt-20 p-2 text-[#9b9b9b]" onClick={()=> handleExplore('projects')}>Explore Projects</button>
                    </div>
                </div>
            )}
        </div>
        </div>
    )
}
export default Explore