import {useNavigate} from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { IoClose } from "react-icons/io5"
import {useSelector, useDispatch} from "react-redux"
import {setLoading} from "../Redux/UserSlice"
import React, {useState} from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Submit from "../Buttons/Submit";

const Login = ()=>{
    const usr = useSelector(state => state.userInfo)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const[passMatch, setPassMatch] = useState(true)
    const[userExists, setUserExists] = useState(false);
    const[responseSignup, setResponseSignup] = useState(null)
    const[emailAddress, setEmail] = useState("")
    const[pass1, setPass1] = useState("")
    const[pass2, setPass2] = useState("")
    const[disabled, setDisabled] = useState(false)

    //to be used to check if the password matches the requirement
    const[passRem, setPassRem] = useState(true)


    const handleClose = ()=>{
        navigate("/")
    }
    const handleLogin = ()=> {
        navigate("../accounts/login")
    }
    const handleSubmit = async(e)=> {
        e.preventDefault()

        const formData = new FormData(e.target)

        if (pass1 !== pass2) {
            setPassMatch(false)
            setPassRem(true)
            return
        }
        else{
            setPassMatch(true)
            //now check if the password is at least 16 characters OR at least 8 characters including a number and a letter
            const hasLetter = /[a-zA-Z]/.test(pass1)
            const hasNumber = /[0-9]/.test(pass1)
            if(!pass1.length >=16 || !(pass1.length >=8 && hasLetter && hasNumber)) {
                setPassRem(false)
                return
            }
        }

        dispatch(setLoading(true))
        const requestBody = {
            email: formData.get('email'),
            password: pass1
        }
        const response = await fetch('http://localhost:8080/accounts/signup', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        )
        dispatch(setLoading(false))
        const data = await response.text()

        //in here we should return that users account exists
        if (!response.ok) {//unauthorised
            setDisabled(true)
            setResponseSignup(data)
            if (response.status === 409) {
                setDisabled(true)
                toast.error(data, {
                    onClose: () => {
                        setEmail("")
                        setPass1("")
                        setPass2("")
                        setUserExists(true)
                        setDisabled(false)
                    }
                })
            }
        }
        else { //201
            setDisabled(true)
            toast.success(data, {
                onClose: ()=>{
                    navigate("/accounts/login")
                }
            })
    }
    }

    return(
        <div className= 'flex flex-col justify-center items-center h-screen'>
            <div className= {`${!passMatch || !passRem  ? 'h-[608px]' :'h-[525px]'} border rounded-lg w-[400px]`}>
                <IoClose size={30}  className='ml-auto hover:cursor-pointer hover:scale-110' onClick={ handleClose }/>
                <ToastContainer position={"top-center"} />
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center font-bold text-xl my-2'>Signup</h1>
                    <div className='flex items-center flex-col'>
                        <input value={emailAddress} disabled={disabled} onChange={(e) => setEmail(e.target.value)}
                               placeholder='Email' type='email' name='email'
                               className='border rounded-lg p-2 w-[90%] my-3 outline-none focus:border-gray-500' required/>
                        <input value={pass1} disabled={disabled} onChange={(e) => setPass1(e.target.value)}
                               placeholder='Create Password' name='pass1' type='password'
                               className='border rounded-lg p-2 w-[90%] mb-4 outline-none focus:border-gray-500' required/>
                        <input value={pass2} disabled={disabled} onChange={(e) => setPass2(e.target.value)}
                               placeholder='Confirm Password' name='pass2' type='password'
                               className='border rounded-lg p-2 w-[90%] mb-1 outline-none focus:border-gray-500' required/>
                        {!passMatch &&
                            <p className='bg-[#ffebe8] p-2 my-3 rounded-md w-[90%] mr-auto ml-5'>Passwords don't
                                match</p>}
                        {!passRem &&
                            <p className="bg-[#ffebe8] p-2 my-3 rounded-md w-[90%] mr-auto ml-5"> At least 16 characters
                                OR at least 8 characters including a number and a letter.</p>}
                    </div>
                    <button disabled={disabled}
                            className="w-[90%] bg-blue-600 rounded-lg my-4 ml-3 p-2 text-white flex justify-center">
                        <Submit text={"Signup"} disabled={disabled}/>
                    </button>
                    <div className='flex justify-center'>
                        <p className='mr-1'>Already have an account?</p>
                        <button className='text-blue-500 hover:underline' onClick={handleLogin}>Login</button>
                    </div>
                    <div className='flex mt-2'>
                        <div className='border-b w-[40%]'></div>
                        <p>Or</p>
                        <div className='border-b w-[40%]'></div>
                    </div>
                    <div className='flex'>
                        <div className='flex border rounded-lg p-2 ml-5 my-5 w-[90%] bg-blue-500 cursor-pointer'>
                            <FaFacebook size={25} color='blue'/>
                            <p className='ml-10 text-white'>Login with Facebook</p>
                        </div>
                    </div>
                    <div className='flex border p-2 rounded-lg ml-5 w-[90%] cursor-pointer'>
                        <FcGoogle size={25}/>
                        <p className='ml-10 text-gray-400'>Login with Google</p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login