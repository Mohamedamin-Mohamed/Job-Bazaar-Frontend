import Image from "../../Images/referrals.png";
import ReferralsRibbon from "./ReferralsRibbon";
import {useNavigate} from "react-router-dom";

const MyReferrals = ()=>{
    const navigate = useNavigate()

    const handleRefer = ()=>{
        navigate('../refer')
    }
    return (
        <>
            <ReferralsRibbon text={"My Referrals"} height={64}/>
        <div className="flex flex-col justify-center items-center">
            <div className="w-[206px] h-[142px] flex justify-center mt-8">
                <img src={Image} alt="" className="w-[90px] h-[150px]"/>
            </div>
            <div className="flex flex-col justify-center mt-12 p-2">
                <p className="text-[#4f5666]">You haven't referred anyone yet</p>
                <button
                    className="text-[#367c2b] font-medium w-[57.5%] border border-[#367c2b] flex ml-16 mt-4 pl-3 py-1 hover:bg-[#367c2b] hover:text-white"
                    onClick={handleRefer}>Refer A Friend
                </button>
            </div>
        </div>
            </>
    )
}
export default MyReferrals
