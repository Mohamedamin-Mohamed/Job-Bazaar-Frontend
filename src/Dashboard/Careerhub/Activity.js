import {NavLink} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

const Activity = ()=>{
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    return(
        <div className={`"flex flex-col text-[#367c2b] mt-10 border ${!isMediumScreen ? "w-[88%] mx-12 p-4" : "flex w-[345px] p-4"} h-[280px]"`}>
            <h1 className="text-black font-bold p-1.5">My activity</h1>
           <div className="flex justify-between p-2 font-bold hover:underline hover:cursor-pointer">
               <p>Job Applications</p>
               <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
           </div>
            <div className="flex justify-between p-2 font-bold hover:underline hover:cursor-pointer">
                <p>Project Applications</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-between p-2 border-b mb-4 pb-6 font-bold hover:underline hover:cursor-pointer">
                <p>Referrals</p>
                <p className="bg-[#cfd9cc] rounded-md px-1">0</p>
            </div>
            <div className="flex justify-center font-bold hover:underline hover:cursor-pointer">
                <NavLink to='/refer'>Refer a friend</NavLink>
            </div>
        </div>
    )
}
export default Activity
