import {VscClose} from "react-icons/vsc";
import {IoSearchOutline} from "react-icons/io5";
import Image from "../../../Images/empty_self_chat.svg";
import {useState} from "react";

const AddRole = ({open, handleOpen})=>{
    const[searchRoles, setSearchRoles] = useState("")
 return (
     <div
         className={!open ? 'hidden' : 'fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50 z-50'}>
         <div
             className="flex flex-col p-7 text-black bg-white w-[520px] border h-[480px] ease-in-out duration-500">


             <div className="flex">
                 <div>
                     <h1 className="text-xl font-semibold">Add roles</h1>
                 </div>
                 <div className="ml-auto">
                     <VscClose size={24} color="black" className="cursor-pointer" onClick={handleOpen}/>
                 </div>
             </div>
             <div
                 className={`flex w-[460px] h-[44px] border mt-8 py-1 ${searchRoles !== '' ? " border-2 border-[#367c2b]" : "border-gray-400"}`}>
                 <IoSearchOutline size={20} onClick={handleOpen} className="mt-2 ml-4"/>
                 <input value={searchRoles} onChange={(e) => setSearchRoles(e.target.value)} type="text"
                        placeholder="Type to search roles" className="w-[500px] outline-none ml-4 text-lg"/>
                 {searchRoles !== '' && <VscClose size={24} className="ml-auto mt-0.5 mr-3 cursor-pointer" color="gray"
                                                   onClick={() => setSearchRoles('')}/>}

             </div>
             <p className="ml-1 mt-3">0 suggestions(s)</p>
         </div>

     </div>
 )
}
export default AddRole