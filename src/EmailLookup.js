import { MdLockReset } from "react-icons/md";
import { TbMailExclamation } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {
    setEmail,
    setEmailLookupShow,
    setHomeTileShow,
    setLoading,
    setLoginShow,
    setPasswordResetShow,
    setSignupShow
} from "./Redux/UserSlice";
import ClipLoader from "react-spinners/ClipLoader";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useState} from "react";
import {SyncLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";

const EmailLookup = ()=>{
    const usr = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[disabled, setDisabled] = useState(false)

    const handleBacktickLogin = ()=>{
        // dispatch(setEmailLookupShow(false))
        // dispatch(setLoginShow(true))
        navigate("/login")
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')
        dispatch(setLoading(true))

        const response = await fetch(`http://localhost:8080/accounts/login/${email}/email-lookup/`, {
            method: 'post'
        })
        const data = await response.text()
        dispatch(setLoading(false))
        if(response.ok){
            setDisabled(true)
            toast.success(data, {
                onClose: ()=>{
                    //close the email lookup component and show password reset component so that the user can change their password
                    // dispatch(setEmailLookupShow(false))
                    // dispatch(setHomeTileShow(false))
                    // dispatch(setEmail(email))
                    // dispatch(setPasswordResetShow(true))
                    navigate("/login/password-reset")
                }
            })
        }
        else{
            if(response.status === 404){ //404 email not found
                toast.error(data, {
                    onClose: ()=>{
                        // //hide the email lookup component and show the signup component so that the user can create an account
                        // dispatch(setEmailLookupShow(false))
                        // dispatch(setSignupShow(true))
                        navigate("../../signup")
                    }
                })

            }
        }
    }
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="h-[420px]'} border rounded-lg w-[400px]">
                <ToastContainer position="top-center" />
                <div className="flex justify-center ">
                <MdLockReset size={30}  color="blue" className="my-6"/>
                </div>
                <h1 className="text-center font-bold text-xl mb-4">Forgot Password</h1>
                <form onSubmit={(event)=> handleSubmit(event)}>
                <p className="text-center text-gray-500">Enter your email to search for your account.</p>
                <div className="flex justify-center border border-gray-600 rounded-lg w-[88%] ml-7 p-1 my-8">
                    <TbMailExclamation size={30} color="gray" className="mr-1" />
                    <input type="email" name="email" placeholder="Email Address" disabled={disabled} className="outline-none mr-32 text-black"/>
                </div>
                    <div className="bg-[#42b72a] text-white ml-8 mr-6 rounded-lg p-1.5">
                <button type="submit" disabled={usr.loading} className="w-[88%] text-lg">{usr.loading ? <SyncLoader size={12} color="#blue" loading={ usr.loading}/>: 'Submit'}</button>
                    </div>
                </form>
                <div className="flex justify-center items-center my-8">
                <IoMdArrowRoundBack size={25} color="black" className="mr-2"/>
                <button onClick={handleBacktickLogin} className="text-gray-500 font-clear hover:underline">Back to Login</button>
                </div>
            </div>
        </div>
    )
}
export default EmailLookup
