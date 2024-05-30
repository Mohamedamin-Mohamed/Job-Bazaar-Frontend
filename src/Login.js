import {redirect, Link, NavLink} from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { IoClose } from "react-icons/io5"
import {useSelector, useDispatch} from "react-redux"
import {setEmailLookupShow, setHomeTileShow, setLoading, setLoginShow, setSignupShow} from "./Redux/UserSlice"
import {useState} from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = ()=>{
    const usr = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    const [responseLogin, setResponseLogin] = useState(null)
    const[statusCode, setStatusCode] = useState(null)

    const handleClose = ()=>{
        dispatch(setLoginShow(false))
        dispatch(setHomeTileShow(true))
    }
    const handleSignup = ()=>{
        dispatch(setLoginShow(false))
        dispatch(setSignupShow(true))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        dispatch(setLoading(true))
        const formData = new FormData(e.target)

        const requestBody = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        console.log(requestBody)
        const response = await fetch('http://localhost:8080/accounts/login/', {
                methrod: 'post',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(requestBody)
        })
        dispatch(setLoading(false))

        const data = await response.text()
        if(response.ok){
            toast.success(data)
            setStatusCode(null)
            redirect('/')
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
    const handlePasswordReset = ()=>{
        dispatch(setLoginShow(false))
        dispatch(setEmailLookupShow(true))
    }
        return(
            <div className="flex flex-col justify-center items-center h-screen">
        <div className= {`h-${statusCode !== null ? '[560px]' :'[500px]'} border rounded-lg w-[400px]`}>
            <IoClose size={30}  className='ml-auto hover:cursor-pointer hover:scale-110' onClick={ handleClose }/>
            <ToastContainer position={"top-center"}/>
            <div className= 'ml-4 flex-col'>
                <form onSubmit={(event)=>handleSubmit(event)}>
                <h1 className='text-center font-bold text-xl my-2'>Login</h1>
                <div className='flex items-center flex-col'>
                <input placeholder= 'Email' type='email' name='email' className='border rounded-lg p-2 w-[91%] mb-3 mt-2 mr-4 outline-none' required/>
                    {statusCode === 404 && <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2'>{responseLogin}</p>}
                <input placeholder= 'Password' type='password' name='password' className='border rounded-lg p-2 w-[91%] mb-4 mr-4 outline-none' required/>
                    {statusCode === 401 && <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2'>{responseLogin}</p>}
                </div>
                <div className='flex justify-center'>
                <button onClick={handlePasswordReset} className='text-blue-500 hover:underline'>Forgot Password?</button>
                </div>
                <button type='submit' className='w-[90%] bg-blue-600 rounded-lg my-4 ml-3 p-2 text-white'>{usr.loading ? <ClipLoader color="blue" size={35} loading={ usr.loading }/> : 'Login' }</button>
                <div className='flex justify-center'>
                <p className='mr-1'>Don't have an account?</p>
                <button className='text-blue-500 hover:underline' onClick={ handleSignup }>Signup</button>
                </div>
                <div className='flex mt-2'>
                <div className='border-b w-[40%]'></div>
                <p>Or</p>
                    <div className='border-b w-[40%]'></div>
                </div>
                <div className='flex'>
                <div className= 'flex border rounded-lg p-2 mx-4 my-6 w-[90%] ml-3 bg-blue-500 cursor-pointer'>
                     <FaFacebook size={25} color='blue'/>
                     <p className='ml-16 text-white'>Login with Facebook</p>
                </div>
            </div>
                <div className='flex border p-2 rounded-lg mx-4  w-[90%] ml-3 cursor-pointer'>
                  <FcGoogle size={25} />
                  <p className='ml-16 text-gray-400'>Login with Google</p>
                </div>
                </form>
            </div>
            </div>
            </div>
    )
}
export default Login