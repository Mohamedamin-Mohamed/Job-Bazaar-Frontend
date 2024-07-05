import ReferralsRibbon from "./Referrals/ReferralsRibbon";
import { BiSolidUserAccount } from "react-icons/bi";
import {useState} from "react";

const Settings = ()=>{
    const[termsAndServices, setTermsAndServices] = useState(false)
    return(
        <div>
            <ReferralsRibbon text={"Settings"} height={60} />
            <div className="flex justify-center items-center absolute inset-0 w-full h-screen">
            <div className="flex flex-col justify-center pl-4 w-[520px] h-[200px] border">
                <div className="flex space-x-2">
                    <BiSolidUserAccount size={20} color="gray" className="mt-2" />
                    <h1 className="font-semibold text-lg">Account Settings</h1>
                </div>
                <h1 className="text-gray-500 pb-6">Manage your account and personal information</h1>
                <div>
                    <div className="flex flex-col border-t py-4">
                        <div className="flex">
                            <h1 className="font-semibold">Terms and Services</h1>
                            <p className="ml-auto mr-4 cursor-pointer text-[#367c2b]">View</p>
                        </div>
                        <h1 className="text-gray-500">Review Terms and Services you agreed to in onboarding</h1>
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}
export default Settings