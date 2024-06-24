import { IoIosArrowRoundForward } from "react-icons/io";
import { TbBulb } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import {useMediaQuery} from "react-responsive";

const Tasks = ()=>{
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens

    return(
        <div className={`"flex h-screen flex-col text-[#367c2b] mt-10 border ${!isMediumScreen ? "w-[88%] mx-12 p-4" : "flex w-[345px] ml-28 p-4"} h-[290px] "`}>
            <div className="flex justify-between mb-4">
                <div className="flex">
                    <h1 className="mr-2 text-black font-bold">My Tasks </h1>
                    <p className="bg-[#cfd9cc] rounded-md px-1">4</p>
                </div>

                <button className="text-[#9b9b9b] font-medium">View all tasks</button>
            </div>
            <div className="flex">
                <IoIosArrowRoundForward size={25} color="green"/>
                <p className="ml-4 mb-4 text-black font-semibold hover:underline hover:cursor-pointer">Update your Profile</p>
            </div>
            <div className="flex  mb-4">
                <div className="md:w-[300px] w-[65px] h-[6px] bg-[#367c2b] rounded-md mr-1"></div>
                <div className="md:w-[300px] w-[65px] h-[6px] bg-[#367c2b] rounded-md mr-1"></div>
                <div className="md:w-[300px] w-[65px] h-[6px] bg-[#367c2b] rounded-md mr-1"></div>
                <div className="md:w-[300px] w-[65px] h-[6px] bg-[#367c2b] rounded-md"></div>
            </div>
            <div className="flex justify-between">
                <div className="flex bg-[#fff89c] ">
                    <TbBulb size={16} className="mt-0.5" />
                    <p className="text-[#5c5500] font-medium">Improves recommendations</p>
                </div>
                <p className="text-[#4f5666">0/4 steps</p>
            </div>

            <div className="flex mt-4">
                <IoIosArrowRoundForward size={25} color="green"/>
                <p className="ml-4 mb-4 text-black font-semibold hover:underline hover:cursor-pointer">Update your Career Interests</p>
            </div>
            <div className="flex mb-4 ">
                <div className="md:w-[500px] w-[130px] h-[6px] bg-[#e6f0e1] rounded-md mr-1 border border-green-700"></div>
                <div className="md:w-[500px] w-[127px] h-[6px] bg-[#e6f0e1] rounded-md  border  border-green-700"></div>
            </div>
            <div className="flex justify-between">
                <div className="flex bg-[#fff89c] p-0.5">
                    <CiFilter size={16} color="black" className="mt-0.5" />
                    <p className="text-[#5c5500] font-medium">Improves personalization</p>
                </div>
                <p className="text-[#4f5666">0/2 steps</p>
            </div>
        </div>
    )
}
export default Tasks