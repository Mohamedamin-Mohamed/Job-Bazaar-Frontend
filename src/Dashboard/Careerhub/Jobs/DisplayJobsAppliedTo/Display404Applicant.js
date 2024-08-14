import Image404 from "../../../../Images/404_illustration.png";
import {NavLink} from "react-router-dom";

const Display404Applicant = ()=>{
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <div>
                <img src={Image404} alt="" className="w-[127px] h-[196px]"/>
            </div>
            <div className="flex flex-col items-center mt-8">
                <h1 className="text-[#4f5666] font-semibold text-2xl">Application Not Found</h1>
                <p className="my-3 text-[#4f5666] font-semibold">Sorry, you haven't applied for a job yet</p>
                <div className="flex text-[#2575a7] space-x-8">
                    <NavLink to="mailto:mohamedamin204080@gmail.com"
                             className="w-[139px] h-[34px] border border-[#2575a7] bg-[#ffffff] font-semibold text-center pt-1">Contact
                        Support</NavLink>
                    <NavLink to="/careerhub/explore/jobs"
                             className="bg-[#2575a7] text-white w-[140px] h-[32px] font-semibold text-center pt-1">Apply
                        for a Job</NavLink>
                </div>
            </div>
        </div>
    )
}
export default Display404Applicant