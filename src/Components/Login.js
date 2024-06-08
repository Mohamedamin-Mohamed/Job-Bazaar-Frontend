import {Link, Outlet, redirect, useNavigate} from 'react-router-dom'
import { FaGithub } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import {useSelector, useDispatch} from "react-redux"
import {setLoading} from "./Redux/UserSlice"
import React, { useState } from "react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"
import Submit from './Buttons/Submit'

const Login = ()=>{
    const usr = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [responseLogin, setResponseLogin] = useState(null)
    const[statusCode, setStatusCode] = useState(null)
    const[disabled, setDisabled] = useState(false)
    const clientId = 'Ov23li3ucu1gxv0pEdUD'

    const handleClose = ()=>{
        navigate("/")
    }
    const handleSignup = ()=>{

        navigate("/accounts/signup")
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()

        dispatch(setLoading(true))
        const formData = new FormData(e.target)

        const requestBody = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        const response = await fetch('http://localhost:8080/accounts/login/', {
                method: 'post',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(requestBody)
        })
        dispatch(setLoading(false))

        const data = await response.text()
        if(response.ok){
            setDisabled(true)
            toast.success(data, {
                onClose: ()=>{
                    navigate("/")
                }
            })
            setStatusCode(null)

        }
        else{
            //regardless of response status code 401 and 404, set the return response
            setResponseLogin(data)

            if(response.status === 401) { //unauthorized(email is correct but password is incorrect
                setStatusCode(401)
            }
            else if(response.status === 404){ //not found(incorrect email address)
                setStatusCode(404)
            }
        }

    }

    const onSuccessHandler = (credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded);
        navigate("/accounts")
    })

    const errorHandler = ()=>{
        console.log('Login failed')
    }
    const handleSuccess = (response => {
        console.log('Login success!', response)
    })
    const onFail=(error=> {
        console.log('Login Failed!', error);
    })
    const handleProfileSuccess = (response => {
        console.log('Get Profile Success!', response);
    })

return(
            <div className="flex flex-col justify-center items-center h-screen">
                <div className= {`${statusCode !== null ? "h-[560px]" : "h-[520px]"} border rounded-lg w-[400px]`}>
            <IoClose size={30}  className='ml-auto hover:cursor-pointer hover:scale-110' onClick={ handleClose }/>
            <ToastContainer position={"top-center"}/>
            <div className= 'ml-4 flex-col'>
                <form onSubmit={(event)=>handleSubmit(event)}>
                <h1 className='text-center font-bold text-xl my-2'>Login</h1>
                    <div className='flex items-center flex-col'>
                        <input placeholder='Email' type='email' name='email' disabled={disabled}
                               className='border rounded-lg p-2 w-[91%] mb-3 mt-2 mr-4 outline-none focus:border-gray-500' required/>
                        {statusCode === 404 &&
                            <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2 font-medium'>{responseLogin}</p>}
                        <input placeholder='Password' type='password' name='password' disabled={disabled}
                               className='border rounded-lg p-2 w-[91%] mb-4 mr-4 outline-none focus:border-gray-500' required/>

                        {statusCode === 401 &&
                            <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2 font-medium'>{responseLogin}</p>}
                    </div>
                    <div className='flex justify-center'>
                        <button disabled={disabled}>
                    <Link to="./email-lookup" className="text-blue-600 hover:underline" >Forgot Password?</Link>
                        </button>
                </div>
                    <button disabled={disabled} className="w-[90%] bg-blue-600 rounded-lg my-4 ml-3 p-2 text-white flex justify-center">
                        <Submit text={"Log in"}/>
                    </button>
                    <div className='flex justify-center'>
                <p className='mr-1.5'>Don't have an account?</p>
                <button disabled={disabled} className='text-blue-600 hover:underline' onClick={ handleSignup }>Signup</button>
                </div>
                <div className='flex mt-2'>
                <div className='border-b w-[40%]'></div>
                <p>Or</p>
                    <div className='border-b w-[40%]'></div>
                </div>
                <div className='flex'>
                <div className= 'flex border rounded-lg p-2 mx-4 my-6 w-[90%] ml-3 bg-blue-500 cursor-pointer'>
                  <FaGithub size={30} />
                    <Link className='ml-16 text-white' to={"https:github.com/login/oauth/authorize?client_id=" + clientId}>Login with GitHub</Link>
                </div>
            </div>
                <div className='flex border p-2 rounded-lg mx-4  w-[90%] ml-3 cursor-pointer'>

                      <GoogleOAuthProvider clientId={"488140599212-d4r00eq9fl9repl69h8dq7o7083l967j.apps.googleusercontent.com"}>
                          <GoogleLogin onSuccess={(credentialResponse)=>onSuccessHandler(credentialResponse)} onError={errorHandler}
                          />;
                      </GoogleOAuthProvider>
                </div>
                </form>
            </div>
                    <Outlet />
            </div>
            </div>
    )
}
export default Login