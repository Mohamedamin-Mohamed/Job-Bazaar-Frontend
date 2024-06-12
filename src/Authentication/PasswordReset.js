import { MdSecurity } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../Redux/UserSlice";
import {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {SyncLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";
import Back from "../Buttons/Back";
const PasswordReset = ()=>{
    const usr = useSelector(state=> state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[passMatch, setPassMatch] = useState(true)
    const[pass1, setPass1] = useState("")
    const[pass2, setPass2] = useState("")
    const[disabled, setDisabled] = useState(false)

    //to be used to check if the password matches the requirement
    const[passRem, setPassRem] = useState(true)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setDisabled(true)
        if(pass1 !== pass2) {
            setPassMatch(false)
            setPassRem(true)
            return
        }
        else {
            setPassMatch(true)
            //now check if the password is at least 16 characters OR at least 8 characters including a number and a letter
            const hasLetter = /[a-zA-Z]/.test(pass1)
            const hasNumber = /[0-9]/.test(pass1)

            if (!pass1.length >= 16 || !(pass1.length >= 8 && hasLetter && hasNumber)) {
                setPassRem(false)
                return
            }
        }
        dispatch(setLoading(true))
        const formData = new FormData(e.target)
        const requestBody = {
            email: usr.email,
            password: formData.get('pass1')
        }
        console.log(usr.email)
        const response = await fetch(`http://localhost:8080/accounts/login/password-reset/`, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        dispatch(setLoading(false))
        const data = await response.text()
        if(response.ok){//201 password change successful
            toast.success(data, {
                onClose: ()=>{

                    navigate("../accounts/login")
                }
            })
        }
        else {//500
            toast.error(data, {
                onClose: ()=>{
                    navigate("../../signup")
                }
            })
        }

    }
    return(
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="border rounded-lg w-[400px]">
                <ToastContainer position={"top-center"} />
                <div className="flex flex-col justify-center items-center mt-8 ">
                    <TbPasswordUser size={35} color="gray"/>
                    <h1 className="font-bold text-xl mb-4">Password reset</h1>
                    <p className="text-gray-400 font-bold">Set a new password</p>
                </div>
                <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="flex flex-col">
                    <input value={pass1} disabled={disabled} onChange={(e)=> setPass1(e.target.value)}
                           className="my-3 border rounded-md p-2 w-[90%] mx-4 outline-none focus:border-gray-500" type="password" name="pass1"
                           placeholder="New password"/>
                    <input value={pass2} disabled={disabled} onChange={(e)=> setPass2(e.target.value)}
                           className="my-3 border rounded-md p-2 w-[90%] mx-4 outline-none focus:border-gray-500" type="password" name="pass2"
                           placeholder="Confirm new password"/>
                </div>
                {!passMatch && <p className="bg-[#ffebe8] p-2 mb-3 ml-4 rounded-md 2 w-[90%] font-medium">Password don't match</p>}
                {!passRem && <p className="bg-[#ffebe8] p-1 mb-3 ml-4 rounded-md 2 w-[90%] font-medium"> At least 16 characters OR at least 8 characters including a number and a letter.</p>}
                <div className="">
                    <button disabled={disabled} className="bg-blue-600 rounded-md p-2 w-[90%] my-3 mr-2 ml-5 text-white" type='submit'>{usr.loading ? <SyncLoader size={12} color="blue" loading={ usr.loading}/>: 'Set Password'}</button>
                </div>
                </form>
                <div className="flex justify-center my-6">
                    <Back text={"Found you Password"} margin={"12"} disabled={disabled}/>
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
