import {Outlet, useNavigate} from 'react-router-dom'
import {FaGithub} from "react-icons/fa"
import {IoClose} from "react-icons/io5"
import {useDispatch} from "react-redux"
import {setFirstName, setLastName, setLoading, setUsrEmail} from "../Redux/UserSlice"
import React, {useState} from "react"
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode"
import Submit from '../Buttons/Submit'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [responseLogin, setResponseLogin] = useState(null)
    const [statusCode, setStatusCode] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [email, setUserEmail] = useState("")
    const [hovered, setHovered] = useState(false)

    const handleClose = () => {
        navigate("/")
    }
    const handleSignup = () => {

        navigate("/accounts/signup")
    }
    const handleSubmit = async (e) => {
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
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        dispatch(setLoading(false))
        if (response.ok) {
            const data = await response.json()
            const message = data.message
            setDisabled(true)
            const token = data.token
            const user = data.user
            toast.success(message, {
                onClose: () => {
                    dispatch(setUsrEmail(user.email))
                    dispatch(setFirstName(user.firstName))
                    dispatch(setLastName(user.lastName))
                    localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/careerhub")
                }
            })
            setStatusCode(null)

        } else {
            const data = await response.text()
            //regardless of response status code 401 and 404, set the return response
            setResponseLogin(data)

            if (response.status === 401) { //unauthorized(email is correct but password is incorrect
                setStatusCode(401)
            } else if (response.status === 404) { //not found(incorrect email address)
                setStatusCode(404)
            }
        }

    }

    const onSuccessHandler = (credentialResponse => {
        const decoded = jwtDecode(credentialResponse.credential);
        navigate("/accounts")
    })

    const errorHandler = () => {
        console.log('Login failed')
    }
    const handleSuccess = (response => {
        console.log('Login success!', response)
    })
    const onFail = (error => {
        console.log('Login Failed!', error);
    })
    const handleProfileSuccess = (response => {
        console.log('Get Profile Success!', response);
    })
    const handlePasswordLookup = () => {
        navigate("./email-lookup")
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#f0f2f5]">
            <div className={`${statusCode !== null ? "h-[620px]" : "h-[560px]"} border rounded-lg w-[400px] bg-white`}>
                <IoClose size={30}
                         className='ml-auto hover:cursor-pointer hover:scale-110 mt-2 mr-2 hover:rounded-lg hover:border'
                         onClick={handleClose}/>
                <ToastContainer position={"top-center"}/>
                <div className='ml-4 flex-col'>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <h1 className='text-center text-[#367c2b] font-semibold text-2xl my-2'>Login</h1>
                        <div className='flex items-center flex-col'>
                            <input value={email} onChange={(e) => setUserEmail(e.target.value)} placeholder='Email'
                                   type='email' name='email' disabled={disabled}
                                   className='border rounded-lg p-2 w-[91%] mb-6 mt-2 mr-4 outline-none focus:border-[#367c2b]'
                                   required/>
                            {statusCode === 404 &&
                                <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2 font-medium'>{responseLogin}</p>}
                            <input placeholder='Password' type='password' name='password' disabled={disabled}
                                   className='border rounded-lg p-2 w-[91%] mb-4 mr-4 outline-none focus:border-[#367c2b]'
                                   required/>

                            {statusCode === 401 &&
                                <p className='bg-[#ffebe8] p-2 mb-3 rounded-md w-[91%] mr-auto ml-2 font-medium'>{responseLogin}</p>}
                        </div>
                        <div disabled={disabled}
                             className="w-[90%] hover:bg-[#367c2b] border border-[#367c2b] rounded-lg my-4 ml-3 p-2 text-white flex justify-center"
                             onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                            <Submit text={"Log in"} disabled={disabled} hovered={hovered}/>
                        </div>
                    </form>
                    <div className='flex justify-center'>
                        <button disabled={disabled} onClick={handlePasswordLookup}
                                className="text-[#367c2b] font-semibold mb-3 hover:underline">Forgot Password?
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <p className='mr-1.5'>Don't have an account?</p>
                        <button disabled={disabled} className='text-[#367c2b] font-semibold hover:underline'
                                onClick={handleSignup}>Signup
                        </button>
                    </div>
                    <div className='flex mt-2'>
                        <div className='border-b w-[40%]'></div>
                        <p>Or</p>
                        <div className='border-b w-[40%]'></div>
                    </div>
                    <div className='flex'>
                        <div className='flex border rounded-lg p-2 mx-4 my-6 w-[90%] ml-3 bg-blue-500 cursor-pointer'>
                            <FaGithub size={30}/>
                            {/*<Link className='ml-16 text-white' to={"https:github.com/login/oauth/authorize?client_id="}>Login with GitHub</Link>*/}
                        </div>
                    </div>
                    <div className='flex  justify-center'>
                        <GoogleOAuthProvider clientId={""}>
                            <GoogleLogin onSuccess={(credentialResponse) => onSuccessHandler(credentialResponse)}
                                         onError={errorHandler}
                            />
                        </GoogleOAuthProvider>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}
export default Login
