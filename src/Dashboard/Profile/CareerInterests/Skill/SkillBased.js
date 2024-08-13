import Image from '../../../../Images/empty_self_chat.svg'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import Suggestions from "../Suggestions";
const SkillBased = ()=>{
    const[open, setOpen] = useState(false)

    const handleOpen = ()=>{
        setOpen(!open)
    }
    return(
        <div className="flex mx-4 md:mt-0 mt-4">
            <div
                className="flex flex-col pl-6 md:w-full mx-2 text-wrap w-[450px] h-[410px] border rounded-md mb-4 p-4">
                <h1 className="text-lg font-semibold">Skill based suggestions</h1>
                <p className="text-[#4f5666] font-semibold mt-2">Projects and courses that will help you get the skill you’re interested in.</p>
                <div className="flex flex-col justify-center items-center">
                    <img src={Image} alt="" className="w-[100px] mt-10"/>
                    <p className="text-[#69717f] mt-6 font-semibold ">No recommendations available</p>
                </div>
                <div className="flex flex-col text-[#367c2b] font-semibold space-y-6 mt-6">
                    <NavLink to='../../explore/courses' className="border border-[#367c2b] h-[30px] text-center hover:bg-[#367c2b] hover:text-white">Explore Courses</NavLink>
                    <NavLink className="bg-[#e6f0e1] h-[30px] text-center hover:bg-white" onClick={handleOpen}>View all suggestions</NavLink>
                </div>
            </div>
            {open && <Suggestions open={open} handleOpen={handleOpen} title={"Skill"} text={"land a role"} />}
        </div>
    )
}
export default SkillBased