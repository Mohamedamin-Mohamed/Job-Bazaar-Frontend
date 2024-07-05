import Image from '../Images/Illustrations@2x.png'
import NavBar from "../Dashboard/Careerhub/NavBar";
import {NavLink} from "react-router-dom";

const NotFound2 = ()=>{

    return(
        <>
            <NavBar />
            <div className="flex justify-center items-center flex-col mt-56">
                <div>
                    <img src={Image} alt="" className="w-[287px] h-[258px]"/>
                </div>
                <div className="flex flex-col justify-center items-center mt-8">
                    <h1 className="text-[#4f5666] font-semibold text-3xl">Page Not Found</h1>
                    <p className="my-3 text-[#4f5666] font-semibold">Sorry, the page you requested was not found</p>
                    <div className="flex text-[#2575a7] space-x-8">
                        <NavLink to="careerhub" className="bg-[#ffde00] text-black w-[112px] h-[36px] font-semibold text-center pt-1">Go to home</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NotFound2
