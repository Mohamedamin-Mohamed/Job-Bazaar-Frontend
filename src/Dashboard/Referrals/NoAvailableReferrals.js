import Image from "../../Images/referrals.png";

const NoReferralsAvailable = ()=>{
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[206px] h-[142px] flex justify-center mt-8">
                <img src={Image} alt="" className="w-[130px] h-[220px]"/>
            </div>
            <div className="flex flex-col justify-center mt-24 p-2">
                <p className="text-[#4f5666]">There are no available referrals, check back later</p>
            </div>
        </div>
    )
}
export default NoReferralsAvailable