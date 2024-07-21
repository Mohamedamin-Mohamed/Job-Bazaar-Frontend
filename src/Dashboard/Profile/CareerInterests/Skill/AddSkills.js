import {VscClose} from "react-icons/vsc";
import {IoSearchOutline} from "react-icons/io5";
import Image from '../../../Images/empty_self_chat.svg'
import {useState} from "react";

const AddSkills = ({open, handleOpen}) => {
    const[searchSkills, setSearchSkills] = useState("")
    return (
        <div
            className={!open ? 'hidden' : 'fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50 z-50'}>
            <div
                className="flex flex-col p-7 text-black bg-white w-[502px] border h-[570px] ease-in-out duration-500">


                <div className="flex">
                    <div>
                        <h1 className="text-xl font-semibold">Add skills</h1>
                    </div>
                    <div className="ml-auto">
                        <VscClose size={24} color="black" className="cursor-pointer" onClick={handleOpen}/>
                    </div>
                </div>
                <div className={`flex w-[400px] h-[44px] border mt-8 ${searchSkills !== '' ? " border-2 border-[#367c2b]" : "border-gray-400"}`}>
                    <IoSearchOutline size={20} onClick={handleOpen} className="mt-4 ml-4"/>
                    <input value={searchSkills} onChange={(e)=> setSearchSkills(e.target.value)} type="text" placeholder="Type to search skills" className="w-[500px] outline-none ml-4 text-lg"/>
                    {searchSkills !== '' && <VscClose size={28} className="ml-auto mt-2 mr-3 cursor-pointer" color="gray" onClick={()=> setSearchSkills('')}/>}

                </div>
                <p className="ml-1 mt-3">0 suggestions(s)</p>
                <div className="flex justify-center items-center">
                    <img src={Image} alt="Image not found" className="w-[140px] mt-20"/>
                </div>
            </div>

        </div>
    )
}
export default AddSkills