import ImageLeft from "../Images/b.svg";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import ImageRight from "../Images/c.svg";

const LoginPanel = ()=>{
    return(
        <>
            <h1 className="text-center text-5xl text-[#00A264] font-medium py-6">Your work people are here</h1>
            <div className="flex lg:flex-row flex-col mt-28 mb-10 justify-center items-center space-x-60">
                <img src={ImageLeft} alt="" className="h-[350px] lg:ml-28  mx-4"/>


                <div className="flex flex-col justify-items-center w-[350px] mb-4">
                    <h1 className=" mb-3">Create an account or sign in</h1>
                    <button className="flex border p-2 border-gray-500 rounded-md mb-4">
                        <FcGoogle size={30}/>
                        <p className="mx-12 font-medium">Continue with Google</p>
                    </button>

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
                <img src={ImageRight} alt="" className="h-[400px] xl:w-[85%] lg:mx-4"/>
            </div>
        </>

    )
}
export default LoginPanel