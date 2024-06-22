import {NavLink} from "react-router-dom";

const Activity = ()=>{
    return(
        <div className="flex flex-col text-[#367c2b] mt-10 border w-[345px] h-[280px] p-4 ml-40">
            <h1 className="text-black font-bold p-1.5">My activity</h1>
           <div className="flex justify-between p-2 font-bold">
               <p>Job Applications</p>
               <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
           </div>
            <div className="flex justify-between p-2 font-bold">
                <p>Project Applications</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-between p-2 border-b mb-4 pb-6 font-bold">
                <p>Referrals</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-center font-bold">
                <NavLink to='refer'>Refer a friend</NavLink>
            </div>
        </div>
    )
}
export default Activity
