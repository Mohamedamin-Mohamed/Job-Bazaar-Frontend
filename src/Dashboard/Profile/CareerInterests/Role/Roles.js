import {HiOutlinePlus} from "react-icons/hi2";
import {SlEnergy} from "react-icons/sl";
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import AddRole from "./AddRole";
import {useState} from "react";

const Roles = () => {
    const [arrow, setArrow] = useState(true)
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <div className="flex ml-[40px] md:mt-0 mt-4">
            <div
                className={`flex flex-col pl-6 md:w-[840px] mx-2 text-wrap w-[650px] ${!arrow ? "h-[440px]" : "h-[390px]"} border rounded-md mb-4 p-4`}>
                <div className="flex my-4">
                    <div>
                        <h1 className="text-xl font-semibold">Roles I want</h1>
                    </div>
                    <div className="ml-auto mr-12">
                        <HiOutlinePlus size={20} className="cursor-pointer" onClick={handleOpen}/>
                    </div>
                </div>
                <div className="flex justify-center gap-12 mt-14">
                    <div>
                        <SlEnergy size={20} color="green" className="w-[36px] h-[36px] cursor-pointer"
                                  onClick={handleOpen}/>
                    </div>
                    <div className="flex flex-col">
                        <div>
                            <p className="text-[#4f5666] text-lg w-[70%]">Get jobs recommendations, along with possible
                                career paths based on your interests</p>
                        </div>
                        <div className="w-[92px] h-[36px] flex justify-center bg-[#e6f0e1] hover:bg-white mt-6">
                            <button className="text-[#367c2b]" onClick={handleOpen}>
                                Add role
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex mt-10">
                    <div>
                        <h1 className="text-xl font-semibold ml-4">Suggested roles for you</h1>
                    </div>
                    <div className="ml-auto mr-12">
                        {arrow ? <MdKeyboardArrowDown size={24} className="cursor-pointer" color="gray"
                                                      onClick={() => setArrow(!arrow)}/> :
                            <MdKeyboardArrowUp size={24} className="cursor-pointer" color="gray"
                                               onClick={() => setArrow(!arrow)}/>}
                    </div>
                </div>
                {!arrow &&
                    <div className="flex justify-center">
                        <p className="text-lg text-[#4f5666] mt-6">Suggestions will appear here when available</p>
                    </div>
                }
                {open && <AddRole open={open} handleOpen={handleOpen}/>}
            </div>
        </div>
    )
}
export default Roles