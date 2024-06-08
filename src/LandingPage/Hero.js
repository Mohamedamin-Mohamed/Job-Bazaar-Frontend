import Image from "../Images/job-seeker.avif";
import {RiCommunityFill} from "react-icons/ri";
import {MdOutlineAssuredWorkload} from "react-icons/md";
import {TbClipboardSmile} from "react-icons/tb";
import {HiBanknotes} from "react-icons/hi2";

const Hero = ()=>{
    return(
        <div>
            <img src={Image} alt="" className="w-[90%] h-[680px] ml-10"/>
            <h1 className="text-center text-4xl text-[#00A264] font-medium  border-b pb-6">Your work people are
                here</h1>
            <div className="flex flex-col text-center mt-4">
                <h2 className="text-3xl text-[#20262e]">Get ahead with Job Bazaar</h2>
                <p className="font-medium text-sm my-4">We're serving up trusted insights and anonymous conversation, so
                    you'll have the goods you need to succeed</p>
            </div>
            <div className="flex lg:flex-row flex-col justify-center space-x-12 mt-6 text-lg">
                <div className="flex justify-center space-x-12 my-4">
                    <div className="flex-col ml-8">
                        <RiCommunityFill className="ml-24" size={30}/>
                        <p>Join your work community </p>
                    </div>
                    <div>
                        <MdOutlineAssuredWorkload size={30} className="ml-20"/>
                        <p>Find and apply to jobs</p>
                    </div>
                </div>
                <div className="flex justify-center space-x-12 my-4">
                    <div>
                        <TbClipboardSmile size={30} className="ml-24"/>
                        <p className="mr-2">Search for company reviews</p>
                    </div>
                    <div className="">
                        <HiBanknotes size={30} className="ml-12"/>
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