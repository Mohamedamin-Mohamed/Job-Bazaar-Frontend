import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {useState} from "react";
import {setCredentials, setFirstPanel, setLoading, setSecondPanel, setUsrEmail} from "../Redux/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import {ClipLoader} from "react-spinners";
import {MdOutlineDoNotDisturb} from "react-icons/md";
import EmailValidation from "./EmailValidation";
const LoginPanel = ()=>{
    const usr = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const[email, setEmail] = useState("")
    const[emailValid, setEmailValid] = useState(true)
    const handleValidation = async ()=>{
        dispatch(setUsrEmail(email))

        if(email === '' || email === null ){
            setEmailValid(true)
            setEmail(null)
            return
        }
        else{
            let valid = EmailValidation(email)
            if(!valid){
                setEmailValid(false)
                return
            }
        }

        dispatch(setLoading(true))

        //make an email lookup, if the email is valid replace the LoginPanel with
        const response = await fetch(`http://localhost:8080/accounts/login/${email}/email-lookup/`, {
            method: 'get'
        })
        dispatch(setLoading(false))

        const data = await response.text()
            if(response.ok){
                dispatch(setCredentials(true))
                dispatch(setFirstPanel(false))
                dispatch(setSecondPanel(true))
        }
            else{
                dispatch(setCredentials(false))
                dispatch(setFirstPanel(false))
                dispatch(setSecondPanel(true))
            }
    }
    return(
        <>
            <div className="flex flex-col justify-center mb-4  lg:ml-32 lg:mt-4 mt-10">

                <h1 className=" mb-3 font-medium text-center">Create an account or sign in</h1>
                <button className="flex border p-2 border-gray-500 rounded-md mb-4">
                    <FcGoogle size={30}/>
                    <p className="mx-12 font-medium">Continue with Google</p>
                </button>

                <button className="flex border p-2 border-gray-500 rounded-md">
                    <FaGithub size={30}/>
                    <p className="mx-12 font-medium">Continue with GitHub</p>
                </button>
                <p className="mt-4 mb-2 text-[#00060c] font-medium">Enter Email</p>

                <input value={email} required type="email" onChange={(e)=> setEmail(e.target.value)}
                       className={`w-[350px] border p-2 outline-none ${email === null || !emailValid ? 'bg-[#fff1f0] border-[#c13833]' : 'border-gray-600'} rounded-md outline-none`}/>
                {email === null && (
                    <div className="flex mt-3">
                    <MdOutlineDoNotDisturb size={20} color="red"/>
                    <p className=" text-[#c13833] ml-[8px] text-sm mt-">Email is mandatory.</p>
                    </div>
                )}
                {
                    !emailValid && (
                        <div className="flex mt-3">
                            <MdOutlineDoNotDisturb size={20} color="red"/>
                            <p className=" text-[#c13833] ml-[8px] text-sm mt-">Email is not valid.</p>
                        </div>
                    )
                }
                <button className="hover:bg-[#367c2b] hover:text-white text-[#367c2b] font-semibold p-3 border border-gray-600 rounded-md mt-5"
                        type="submit"
                        onClick={handleValidation}> {usr.loading ? <ClipLoader color="#36d7b7" /> : "Continue with email"}</button>

            </div>
        </>
    )
}
export default LoginPanel