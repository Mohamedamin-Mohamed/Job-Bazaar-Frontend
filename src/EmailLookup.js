import { MdLockReset } from "react-icons/md";
import { TbMailExclamation } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";

import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, setLoginShow, setPasswordResetShow} from "./Redux/UserSlice";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = ()=>{
    const usr = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()

    const[emailFound, setEmailFound] = useState(false)
    const handleBacktickLogin = ()=>{
        dispatch(setPasswordResetShow(false))
        dispatch(setLoginShow(true))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target.value)
        const email = formData.get('email')
        dispatch(setLoading(true))

        const response = await fetch('http://localhost:8080/accounts/login/password-reset', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
        dispatch(setLoading(false))
    }
    return(
        <div className={emailFound ? "fixed items-center border h-[440px] text-black  bg-white w-[450px] backdrop-blur-2x rounded-lg" :"fixed items-center border h-[420px] text-black  bg-white w-[400px] backdrop-blur-2x rounded-lg"}>
            <div>
                <div className="flex justify-center ">
                <MdLockReset size={30}  color="blue" className="my-6"/>
                </div>
                <h1 className="text-center font-bold text-xl mb-4">Forgot Password</h1>
                <form onSubmit={(event)=> handleSubmit(event)}>
                <p className="text-center text-gray-500">Enter your email to search for your account.</p>
                <div className="flex justify-center border border-gray-600 rounded-lg w-[88%] ml-8 p-1 my-8">
                    <TbMailExclamation size={30} color="gray" className="mr-1" />
                    <input type="email" name="email" placeholder="Email Address" className="outline-none mr-32 text-black"/>
                </div>
                {emailFound && <p>We cannot find your email</p>}
                    <div className="bg-[#42b72a] text-white ml-8 mr-6 rounded-lg p-1.5">
                <button type="submit" disabled={usr.loading} className="w-[88%] text-lg">{usr.loading ? <ClipLoader color="green" size={30} loading={usr.loading} />: 'Submit'}</button>
                    </div>
                </form>
                <div className="flex justify-center my-8">
                <IoMdArrowRoundBack size={30} color="black" className="mr-2"/>
                <button onClick={handleBacktickLogin} className="text-gray-500">Back to Login</button>
                </div>
            </div>
        </div>
    )
}
export default ResetPassword
