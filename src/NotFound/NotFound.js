import NavBar from "../Dashboard/Careerhub/NavBar";
import Image404 from '../Images/404_illustration.png'
import {NavLink} from "react-router-dom";
const NotFound = ()=>{
    return(
        <>
            <NavBar />
            <div className="flex items-center flex-col bg-gray-100 h-screen">
                <div className="mt-12">
                    <img src={Image404} alt="" className="w-[127px] h-[196px]"/>
                </div>
                <div className="flex flex-col justify-center items-center mt-8">
                <h1 className="text-[#4f5666] font-semibold text-2xl">Page Not Found</h1>
                    <p className="my-3 text-[#4f5666] font-semibold">Sorry, the page you requested was not found</p>
                    <div className="flex text-[#2575a7] space-x-8">
                        <NavLink to="mailto:mohamedamin204080@gmail.com" className="w-[139px] h-[34px] border border-[#2575a7] bg-[#ffffff] font-semibold text-center pt-1">Contact Support</NavLink>
                        <NavLink to="careerhub" className="bg-[#2575a7] text-white w-[65px] h-[32px] font-semibold text-center pt-1">Home</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NotFound