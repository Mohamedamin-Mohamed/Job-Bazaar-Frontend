import {Link, NavLink} from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { IoClose } from "react-icons/io5"
import {useSelector, useDispatch} from "react-redux"
import {setLoading, setLoginShow, setSignupShow} from "./Redux/UserSlice"
import {useState} from "react";
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ()=>{
    const usr = useSelector(state => state.userInfo)

    const dispatch = useDispatch()
    const[passMatch, setPassMatch] = useState(true)
    const[userExists, setUserExists] = useState(false);
    const[responseSignup, setResponseSignup] = useState(null)
    const[emailAddress, setEmail] = useState("")
    const[pass1, setPass1] = useState("")
    const[pass2, setPass2] = useState("")

    const handleClose = ()=>{
        dispatch(setSignupShow(false))
    }
    const handleLogin = ()=> {
        dispatch(setSignupShow(false))
        dispatch(setLoginShow(true))
    }
    const handleSubmit = async(e)=> {
        e.preventDefault()
        dispatch(setLoading(true))

        const formData = new FormData(e.target)

        if (pass1 !== pass2) {
            setPassMatch(false)
            return
        }
        setPassMatch(true)

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
            setResponseSignup(data)
            if (response.status === 409) {
                toast.error("Account already exists")
                setTimeout(()=>{
                    setEmail("")
                    setPass1("")
                    setPass2("")
                },6000)
                setUserExists(true)
            }
        }
        else { //201
            toast.success("Account created successfully, Login to your account", {
                onClose: ()=>{
                    //we hide the Signup component and show the Login component
                    dispatch(setSignupShow(false))
                    dispatch(setLoginShow(true))
                }
            })
    }
    }

    return(
        <div className= {userExists ? 'fixed items-center border h-[580px] text-black  bg-white w-[400px] backdrop-blur-2x rounded-lg' : 'fixed items-center border h-[520px] text-black  bg-white w-[400px] backdrop-blur-2x rounded-lg'}>
            <IoClose size={30}  className='ml-auto hover:cursor-pointer hover:scale-110' onClick={ handleClose }/>
            <div className= 'ml-4'>
                <ToastContainer position={"top-center"} />
                <form onSubmit={handleSubmit}>
                <h1 className='text-center font-bold text-xl my-2'>Signup</h1>
                <div className='flex flex-col'>
                    <input value={emailAddress} onChange={(e)=> setEmail(e.target.value)} placeholder= 'Email' type='email' name='email' className='border rounded-lg p-2 w-[90%] my-3' required/>
                    <input value={pass1} onChange={(e)=> setPass1(e.target.value)} placeholder= 'Create Password' name='pass1' type='password' className='border rounded-lg p-2 w-[90%] mb-4'  required/>
                    <input value={pass2} onChange={(e)=> setPass2(e.target.value)} placeholder='Confirm Password' name='pass2' type='password' className='border rounded-lg p-2 w-[90%] mb-1' required/>
                    {!passMatch && <p className='text-red-500 ml-1 '>Passwords don't match</p>}
                </div>

                <button className='w-[90%] bg-blue-600 rounded-lg my-4 p-2 text-white'>{usr.loading ? <ClipLoader color="white" size={35} loading={ usr.loading }/> : 'Signup' }</button>
                <div className='flex justify-center'>
                    <p className='mr-1'>Already have an account?</p>
                    <button className='text-blue-500 hover:underline' onClick={ handleLogin }>Login</button>
                </div>
                <div className='flex mt-2'>
                    <div className='border-b w-[40%]'></div>
                    <p>Or</p>
                    <div className='border-b w-[40%]'></div>
                </div>
                <div className='flex'>
                    <div className= 'flex border rounded-lg p-2 mx-4 my-5 w-[90%] bg-blue-500 cursor-pointer'>
                        <FaFacebook size={25} color='blue'/>
                        <p className='ml-10 text-white'>Login with Facebook</p>
                    </div>
                </div>
                <div className='flex border p-2 rounded-lg mx-4 w-[90%] cursor-pointer'>
                    <FcGoogle size={25} />
                    <p className='ml-10 text-gray-400'>Login with Google</p>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Login