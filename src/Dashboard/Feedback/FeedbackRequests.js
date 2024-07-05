import { IoIosSearch } from "react-icons/io"
import Chat from '../../Images/empty_self_chat.svg'
const FeedbackRequests = ()=>{
    return(
        <div className="flex flex-col md:w-[800px] mr-4">
            <div className="flex w-full md: mt-4 border border-[#1a212e] p-2 mr-6">
                <IoIosSearch size={20} color="gray"/>
                <input placeholder="Search Candidate, Interview/Interaction, Feedback..." className="outline-none w-full ml-2"/>
            </div>
            <nav className="flex justify-between list-none text-[#9b9b9b] space-x-4 mt-3 border-t border-b pb-4 pt-4">
                <li>Candidate</li>
                <li>Position/Community & Requester</li>
                <li>Feedback Form</li>
                <li>Requested On </li>
                <li>Actions</li>
            </nav>
            <div className="flex flex-col justify-center items-center text-[#69717f] mt-4">
                <div>
                    <img src={Chat} alt="" className="h-[120px]"/>
                </div>
                <h1 className="font-semibold mt-4 text-lg">No feedback requests</h1>
                <div className="flex flex-col text-center mt-3">
                <p >There are no requests</p>
                <p>Matching your search criteria</p>
                </div>
            </div>
        </div>
    )
}
export default FeedbackRequests;