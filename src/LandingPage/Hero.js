import {RiCommunityFill} from "react-icons/ri";
import {MdOutlineAssuredWorkload} from "react-icons/md";
import {TbClipboardSmile} from "react-icons/tb";
import {HiBanknotes} from "react-icons/hi2";
import AuthShowcase from "./AuthShowcase";

const Hero = ()=>{
    return(
        <div>
            <AuthShowcase />
            <div className="flex flex-col text-center mt-4">
                <h2 className="text-3xl text-[#20262e] border-t pt-5">Get ahead with Job Bazaar</h2>
                <p className="font-medium text-xl my-4">We're serving up trusted insights and anonymous conversation, so
                    you'll have the goods you need to succeed</p>
            </div>
            <div className="flex lg:flex-row flex-col justify-center space-x-12 mb-6 text-lg">
                <div className="flex justify-center space-x-12 my-4">
                    <div className="flex-col ml-8">
                        <RiCommunityFill className="ml-24" size={50} color="green"/>
                        <p>Join your work community </p>
                    </div>
                    <div>
                        <MdOutlineAssuredWorkload size={50} className="ml-20" color="green"/>
                        <p>Find and apply to jobs</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-12 my-4">
                    <div>
                        <TbClipboardSmile size={50} className="ml-24" color="green"/>
                        <p className="mr-2">Search for company reviews</p>
                    </div>
                    <div className="">
                        <HiBanknotes size={50} className="ml-12" color="green"/>
                        <p>Compare salaries</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-col items-center bg-[#f5f6f7] h-[204px]">
                <h1 className="text-3xl mb-4">Start your search</h1>
                <p className="text-lg text-center">Discover new job opportunities or post your listings. Start your
                    search now!</p>
            </div>
        </div>
    )
}
export default Hero