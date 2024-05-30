import { MdSecurity } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import {IoMdArrowRoundBack} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {setEmailLookupShow, setLoginShow, setPasswordResetShow} from "./Redux/UserSlice";
const PasswordReset = ()=>{
    const usr = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()

    const handleBacktickLogin = ()=>{
        dispatch(setPasswordResetShow(false))
        dispatch(setLoginShow(true))
    }
    return(
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="border rounded-lg w-[400px]">
                <div className="flex flex-col justify-center items-center mt-8 ">
                    <TbPasswordUser size={35} color="gray"/>
                    <h1 className="font-bold text-xl mb-4">Password reset</h1>
                    <p className="text-gray-400 font-bold">Set a new password</p>
                </div>
                <div className="flex flex-col">
                    <input className="my-3 border rounded-md p-2 w-[90%] mx-4 outline-none" type="password" name="pass1"
                           placeholder="New password"/>
                    <input className="my-3 border rounded-md p-2 w-[90%] mx-4 outline-none" type="password" name="pass2"
                           placeholder="Confirm new password"/>
                </div>
                {}
                <div className="flex justify-center">
                    <button className="bg-blue-600 rounded-md p-2 w-[90%] my-3 mr-2 ml-1" type="submit">Set Password
                    </button>
                </div>
                <div className="flex justify-center items-center my-4">
                    <IoMdArrowRoundBack size={25} color="black" className="mr-2"/>
                    <button  onClick={handleBacktickLogin} className="text-gray-500 font-clear hover:underline">Found your password</button>
                </div>
                <div className="flex justify-center my-6">
                    <MdSecurity size={23} className="mr-2"/>
                    <p>Secured by Task Ninja</p>
                </div>
            </div>
        </div>
    )
}
export default PasswordReset
