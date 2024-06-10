import ImageLeft from "../Images/b.svg";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import ImageRight from "../Images/c.svg";

const LoginPanel = ()=>{
    return(
        <>
            <h1 className="text-center text-5xl text-[#00A264] font-medium py-6">Your work people are here</h1>
            <div className="flex mt-28 mb-10 justify-center space-x-60">
                <img src={ImageLeft} alt="" className="h-[350px]"/>
                <div className="">
                    <h1 className=" mb-3">Create an account or sign in</h1>
                    <div className="flex flex-col justify-center w-[350px] mb-4">
                        <button className="flex border p-2 border-gray-500 rounded-md">
                            <FcGoogle size={30}/>
                            <p className="mx-12 font-medium">Continue with Google</p>
                        </button>
                    </div>
                    <div className="flex flex-col justify-center w-[350px]">
                        <button className="flex border p-2 border-gray-500 rounded-md">
                            <FaGithub size={30}/>
                            <p className="mx-12 font-medium">Continue with GitHub</p>
                        </button>
                        <p className="mt-4 mb-2 text-[#00060c]">Enter Email</p>
                        <input className="w-[350px] border p-2 border-gray-600 rounded-md outline-none"/>
                        <p className="my-3">Please enter a valid email address</p>
                        <button
                            className="hover:bg-blue-600 p-3 border border-gray-600 rounded-md font-medium ">Continue
                            with email
                        </button>

                    </div>
                </div>
                <img src={ImageRight} alt="" className="ml-20 h-[350px]"/>
            </div>
        </>

    )
}
export default LoginPanel