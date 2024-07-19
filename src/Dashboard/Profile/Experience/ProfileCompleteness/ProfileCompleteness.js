import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {useState} from "react";
import Image from '../../../Images/resume.svg'

const ProfileCompleteness = ()=>{
    const[arrowToggle,setArrowToggle]=useState(false);
    return(
        <div className="flex justify-center items-center md:mt-0 mt-16">
            <div className="flex flex-col justify-center pl-4 md:w-[840px] mx-2 w-[650px] h-[420px] border mb-4">
                <div className="flex flex-row space-x-2 pb-7">
                    <h1 className="font-semibold text-lg">Make Career Hub work for you</h1>

                        { !arrowToggle ? <IoIosArrowUp color="gray" size={20} className="ml-auto  cursor-pointer hover:border rounded-full"
                                                       onClick={()=> setArrowToggle(!arrowToggle)}/> :
                            <IoIosArrowDown color="gray" size={20} className="mr-6 cursor-pointer hover:border rounded-full"
                                            onClick={()=> setArrowToggle(!arrowToggle)}/> }
                </div>
                <div>
                    <div className="flex flex-col border-t py-4 mr-3">
                        <p className="text-wrap text-lg">Add more to your profile and get recommendations for the career you want.</p>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold py-2">Profile Completeness</h1>
                            <div className="flex">
                                <div className="md:w-[300px] w-[120px] h-[6px] bg-[#367c2b] rounded-md mr-1"></div>
                                <div className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md mr-1"></div>
                                <div className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md mr-1"></div>
                                <div className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md"></div>
                                <p className="flex">1/4</p>
                            </div>
                        </div>
                        <div className="border-t w-full">
                            <div className="flex flex-col w-[350px] h-[210px] border p-3 my-4">
                                <div className="flex">
                                    <h1 className="text-lg font-semibold w-[60%]">Complete profile with resume</h1>
                                    <img src={Image} alt="" className="w-[82px] h-[90px] ml-auto"/>
                                </div>
                            <div>
                                <p className="w-[70%] mb-2">Add your career information in one step.</p>
                                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm">Upload Resume</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileCompleteness;