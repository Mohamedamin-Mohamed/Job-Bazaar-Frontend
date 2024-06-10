import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";
import {setEmail} from "../Redux/UserSlice";

const LoginPanel = ()=>{
    const[email, showEmail] = useState("")
    const handleValidation = async ()=>{
        //make an email lookup, if the email is valid replace the LoginPanel with
        const response = await fetch(`http://localhost:8080/accounts/login/${email}/emailLookup`)
        if(response.ok){

        }
        else{

        }

    }
    return(
        <>
            <div className="flex flex-col justify-center mb-4 mx-14 ml-12 ">
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
                <input value={email} onChange={(e)=> setEmail(e.target.value)} className="w-[350px] border p-2 border-gray-600 rounded-md outline-none"/>
                <p className="my-3">Please enter a valid email address</p>
                <button className="hover:bg-blue-600 p-3 border border-gray-600 rounded-md font-medium"
                onClick={handleValidation}>Continue with email</button>


            </div>
        </>
    )
}
export default LoginPanel