import ImageLeft from "../Images/b.svg";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import ImageRight from "../Images/c.svg";
import LoginPanel from "./LoginPanel";

const AuthShowcase = ()=>{
    return(
        <>
            <h1 className="text-center md:text-5xl text-4xl text-[#00A264] font-medium py-6">Your work people are here</h1>
            <div className="flex lg:flex-row flex-col mt-24 items-center xl:justify-evenly ">
                <div className="lg:ml-28">
                    <img src={ImageLeft} alt="" className="h-[450px] w-[500px]"/>
                </div>
                <LoginPanel />
                <div className="lg:ml-24 ml-24">
                    <img src={ImageRight} alt="" className="h-[500px] w-[500px]"/>
                </div>

            </div>
        </>

    )
}
export default AuthShowcase