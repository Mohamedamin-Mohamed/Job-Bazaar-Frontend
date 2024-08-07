import {useNavigate} from 'react-router-dom'
import {FaFacebook} from "react-icons/fa6"
import {FcGoogle} from "react-icons/fc"
import {IoClose} from "react-icons/io5"
import {useDispatch, useSelector} from "react-redux"
import {setFirstName, setLastName, setLoading} from "../Redux/UserSlice"
import React, {useState} from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Submit from "../Buttons/Submit";

const Signup = () => {
    const usr = useSelector(state => state.userInfo)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [passMatch, setPassMatch] = useState(true)
    const [userExists, setUserExists] = useState(false);
    const [responseSignup, setResponseSignup] = useState(null)
    const [emailAddress, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [name, setName] = useState({firstName: '', lastName: ''})
    const[hovered, setHovered] = useState(false)
    const[role, setRole] = useState("")

    //to be used to check if the password matches the requirement
    const [passRem, setPassRem] = useState(true)


    const handleClose = () => {
        navigate("/")
    }
    const handleLogin = () => {
        navigate("/accounts/login")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        if (pass1 !== pass2) {
            setPassMatch(false)
            setPassRem(true)
            return
        } else {
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
        const requestBody = {
            email: formData.get('email'),
            password: pass1,
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            role: formData.get("role")
        }
        const response = await fetch('http://localhost:8080/accounts/signup/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }
        )
        dispatch(setLoading(false))

        const data = await response.json()
        const message = data.message

        //in here we should return that users account exists
        if (!response.ok) {//unauthorised
            setDisabled(true)
            if (response.status === 409) {
                setDisabled(true)
                toast.error(message, {
                    onClose: () => {
                        setEmail("")
                        setPass1("")
                        setPass2("")
                        setName({firstName: '', lastName: ''})
                        setRole("")
                        setUserExists(true)
                        setPassRem(true)
                        setDisabled(false)
                    }
                })
            }
        } else { //201
            setDisabled(true)
            const user = data.user;
            const token = data.token;
            toast.success(message, {
                onClose: () => {
                    dispatch(setFirstName(user.firstName))
                    dispatch(setLastName(user.lastName))
                    localStorage.setItem("token", token)
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/accounts/login")
                }
            })
        }
    }
    const handleChange = (e) => {
        const {name, value} = e.target;
        setName((prevName) => ({
            ...prevName, [name]: value
        }))
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-[#f0f2f5]'>
            <div className={`${!passMatch || !passRem ? 'h-[780px]' : 'h-[720px]'} border rounded-lg w-[400px] bg-white`}>
                <IoClose size={30} className='ml-auto hover:cursor-pointer hover:scale-110 mt-2 mr-2 hover:rounded-lg hover:border' onClick={handleClose}/>
                <ToastContainer position={"top-center"}/>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center text-[#367c2b] font-semibold text-2xl my-2'>Signup</h1>
                    <div className='flex items-center flex-col'>
                        <input value={emailAddress} disabled={disabled} onChange={(e) => setEmail(e.target.value)}
                               placeholder='Email' type='email' name='email'
                               className='border rounded-lg p-2 w-[90%] my-3 outline-none focus:border-[#367c2b]'
                               required/>
                        <input value={name.firstName} disabled={disabled} onChange={handleChange}
                               placeholder="First Name" name="firstName" type="text"
                               className="border rounded-lg p-2 w-[90%] mb-4 outline-none focus:border-[#367c2b]"/>
                        <input value={name.lastName} disabled={disabled} onChange={handleChange}
                               placeholder="Last Name" name="lastName" type="text"
                               className="border rounded-lg p-2 w-[90%] mb-4 outline-none focus:border-[#367c2b]"/>
                        <select value={role} disabled={disabled} name="role" onChange={(e)=> setRole(e.target.value)}
                               className="border rounded-lg p-2 w-[90%] mb-4 outline-none focus:border-[#367c2b] cursor-pointer" required>
                            <option value="" disabled selected>Select your role</option>
                            <option >Employer</option>
                            <option>Applicant</option>
                        </select>
                        <input value={pass1} disabled={disabled} onChange={(e) => setPass1(e.target.value)}
                               placeholder='Create Password' name='pass1' type='password'
                               className='border rounded-lg p-2 w-[90%] mb-4 outline-none focus:border-[#367c2b]'
                               required/>
                        <input value={pass2} disabled={disabled} onChange={(e) => setPass2(e.target.value)}
                               placeholder='Confirm Password' name='pass2' type='password'
                               className='border rounded-lg p-2 w-[90%] mb-1 outline-none focus:border-[#367c2b]'
                               required/>
                        {!passMatch &&
                            <p className='bg-[#ffebe8] p-2 my-3 rounded-md w-[90%] mr-auto ml-5'>Passwords don't
                                match</p>}
                        {!passRem &&
                            <p className="bg-[#ffebe8] p-2 my-3 rounded-md w-[90%] mr-auto ml-5"> At least 16 characters
                                OR at least 8 characters including a number and a letter.</p>}
                    </div>
                    <div disabled={disabled}
                            className="w-[90%] hover:bg-[#367c2b] border border-[#367c2b] rounded-lg my-4 ml-5 p-2 text-white flex justify-center"
                            onMouseEnter={() => setHovered(true)} onMouseLeave={()=> setHovered(false)}>
                        <Submit text={"Signup"} disabled={disabled} hovered={hovered}/>
                    </div>
                    <div className='flex justify-center'>
                        <p className='mr-1'>Already have an account?</p>
                        <button className='text-[#367c2b] font-semibold hover:underline' disabled={disabled}
                                onClick={handleLogin}>Login
                        </button>
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
export default Signup