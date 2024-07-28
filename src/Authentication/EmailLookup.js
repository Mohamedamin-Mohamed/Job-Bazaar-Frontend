import {MdLockReset} from "react-icons/md";
import {TbMailExclamation} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {setLoading, setUsrEmail,} from "../Redux/UserSlice";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Back from "../Buttons/Back";
import Submit from "../Buttons/Submit";

const EmailLookup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(false)
    const [hovered, setHovered] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get('email')

        dispatch(setLoading(true))
        dispatch(setUsrEmail(email))
        setDisabled(true)
        const response = await fetch(`http://localhost:8080/accounts/login/${email}/email-lookup/`, {
            method: 'get'
        })
        const data = await response.text()
        dispatch(setLoading(false))
        if (response.ok) {

            toast.success(data, {
                onClose: () => {
                    navigate("/accounts/login/password-reset")
                }
            })
        } else {
            if (response.status === 404) { //404 email not found

                toast.error(data, {
                    onClose: () => {
                        navigate("/accounts/signup")
                    }
                })

            }
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#f0f2f5]">
            <div className="h-[420px]'} border rounded-lg w-[400px] bg-white">
                <ToastContainer position="top-center"/>
                <div className="flex justify-center ">
                    <MdLockReset size={30} color="green" className="my-6"/>
                </div>
                <h1 className="text-center text-[#367c2b] font-semibold text-2xl mb-4">Forgot Password</h1>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <p className="text-center text-gray-500">Enter your email to search for your account.</p>
                    <div className="flex justify-center border border-[#367c2b] rounded-lg w-[340px] ml-7 p-1 my-8">
                        <TbMailExclamation size={30} color="gray" className="mr-1"/>
                        <input type="email" name="email" placeholder="Email Address" disabled={disabled}
                               className="outline-none w-[280px] ml-2 mr-4 text-black" required/>
                    </div>
                    <button disabled={disabled}
                            className="w-[86%] hover:bg-[#367c2b] border border-[#367c2b] rounded-lg my-4 ml-7 p-2 text-white flex justify-center"
                            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                        <Submit text={"Submit"} disabled={disabled} hovered={hovered}/>
                    </button>
                </form>
                <div className="flex justify-center my-6">
                    <Back text={"Back to Login"} margin={"8"} disabled={disabled}/>
                </div>
            </div>
        </div>
    )
}
export default EmailLookup
