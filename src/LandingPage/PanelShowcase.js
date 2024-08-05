import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";import React, {useState} from "react";
import {setFirstName, setFirstPanel, setLastName, setLoading, setSecondPanel} from "../Redux/UserSlice";
import { IoClose } from "react-icons/io5"
import {MdOutlineDoNotDisturb, MdOutlineDoNotDisturbAlt} from "react-icons/md";
import {ClipLoader} from "react-spinners";
import {toast, ToastContainer} from "react-toastify";

const PanelShowcase = ()=>{
    const usr = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [passIncorrectShow, setPassIncorrectShow] = useState(false)
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)
    const[close, setClose] = useState(false)
    const[passRem, setPassRem] = useState(true)
    const[disabled, setDisabled] = useState(false)
    const[name, setName] = useState({firstName: '', lastName: ''})
    const[role, setRole] = useState('')

    const handleSubmit = async ()=>{
        //check if the password is at least 16 characters OR at least 8 characters including a number and a letter
        const hasLetter = /[a-zA-Z]/.test(pass)
        const hasNumber = /[0-9]/.test(pass)
        if(!(pass.length >=8 && hasLetter && hasNumber || pass.length >= 16 )) {
            setPassRem(false)
            setPassIncorrectShow(false)
            return
        }
        setPassRem(true)
        //in here we primarily check if the password is correct or not
        if(usr.credentials){
            dispatch(setLoading(true))

            //make a login request
            const response = await fetch('http://localhost:8080/accounts/login/', {
                method: 'post',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({email: usr.usrEmail, password: pass})
            })
            dispatch(setLoading(false))
            if(response. ok){
                const data = await response.json();
                const message = data.message
                const user = data.user
                const token = data.token

                setDisabled(true)
                setPassIncorrectShow(false)
                toast.success(message, {
                    onClose: ()=>{
                        dispatch(setFirstName(user.firstName))
                        dispatch(setLastName(user.lastName))
                        localStorage.setItem("token", token)
                        localStorage.setItem("user", JSON.stringify(user))
                        navigate('careerhub')
                    }
                })
            }
            else if(response.status === 401){ //incorrect password
                setPassIncorrectShow(true)
            }
        }
        else{
            //make an account for the user
            dispatch(setLoading(true))

            const requestBody = {
                email: usr.usrEmail,
                password: pass,
                firstName: name.firstName,
                lastName: name.lastName,
                role: role
            }
            const response = await fetch('http://localhost:8080/accounts/signup/', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })

            dispatch(setLoading(false))
            if(response.status === 201){ //account created successfully
                const data = await response.json()
                const message = data.message
                const token = data.token
                const user = data.user
                setDisabled(true)
                toast.success(message, {
                    onClose: ()=>{
                        dispatch(setFirstName(user.firstName))
                        dispatch(setLastName(user.lastName))
                        localStorage.setItem("token", token)
                        localStorage.setItem("user", JSON.stringify(user))
                        navigate('/accounts/login')
                    }
                })
            }
            else{
                const data = await response.text()
                toast.error(data, {
                    onClose: ()=>{
                        dispatch(setSecondPanel(false))
                        dispatch(setFirstPanel(true))
                    }
                })
            }
        }
    }
    const handlePanelsShow = ()=>{
        dispatch(setSecondPanel(false))
        dispatch(setFirstPanel(true))
    }
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setName((prevName) =>({
            ...prevName, [name]: value
        }))
    }
    return(
        <>
            <div className="flex flex-col justify-center mb-4  lg:ml-32 ">
                <h1 className=" mb-3 font-bold text-xl text-center">Welcome {usr.credentials ? 'back' : ''} to Job
                    Bazaar.</h1>
                <ToastContainer position="top-center"/>
                <div className="flex">
                {!usr.credentials ? <p className="">Create your account as </p> : <p>Sign in to your account as</p>}
                <p className="font-bold ml-2">{usr.usrEmail.toUpperCase()}</p>
                </div>
                <NavLink aria-disabled={disabled} onClick={() => handlePanelsShow()} className="text-center text-[#367c2b] font-semibold hover:underline">{!usr.credentials ? 'Register' : 'Sign In'} with a different email.</NavLink>
                <div className={passIncorrectShow ? 'flex mt-6 border p-2 rounded-md bg-[#fff1f0]' : 'hidden'}>
                    <MdOutlineDoNotDisturbAlt size={30} color="red"/>
                    <p className='text-center w-[260px]'>The password you specified is invalid. Please try again.</p>
                    <IoClose size={30} className="ml-auto hover:cursor-pointer"
                             onClick={() => setPassIncorrectShow(false)}/>
                </div>
                {!usr.credentials && (
                    <div>
                    <div className="flex flex-col mt-4">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={name.firstName} onChange={handleChange} placeholder="First Name" className="w-[350px] border p-2 border-gray-600 rounded-md outline-none" required/>
                    </div>
                    <div className="flex flex-col my-4">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={name.lastName} onChange={handleChange} placeholder="Last Name" className="w-[350px] border p-2 border-gray-600 rounded-md outline-none" required/>
                    </div>
                        <div className="flex flex-col mt-1.5">
                            <select value={role} disabled={disabled} name="role"
                                    onChange={(e) => setRole(e.target.value)}
                                    className="border rounded-lg p-2 w-[350px] mb-4 outline-none focus:border-[#367c2b] cursor-pointer"
                                    required>
                                <option value="" disabled selected>Select your role</option>
                                <option>Employer</option>
                                <option>Applicant</option>
                            </select>
                        </div>
                    </div>
                )}

                <p className="mt-2 mb-2 text-[#00060c]">Password</p>

                <input disabled={disabled} value={pass} type={showPass ? 'text' : 'password'}
                       onChange={(e) => setPass(e.target.value)}
                       className="w-[350px] border p-2 border-gray-600 rounded-md outline-none"/>
                <div className={!passRem ? "flex mt-3" : "hidden"}>
                    <MdOutlineDoNotDisturb size={20} color="red"/>
                    <p className=" text-[#c13833] ml-[8px] text-sm w-[325px]">Password must be at least 16 characters OR at least 8 characters
                        including a number and a letter.</p>
                </div>
                <div className="flex my-3">
                    <input type={"checkbox"} disabled={disabled} checked={showPass} onChange={() => setShowPass(!showPass)}/>
                    <p className="ml-4">Show Password</p>
                </div>
                <button disabled={disabled}
                    className="hover:bg-[#367c2b] p-3 border border-[#367c2b] rounded-md font-medium text-[#367c2b] hover:text-white my-3"
                    onClick={handleSubmit}>{usr.loading ? <ClipLoader color="#36d7b7"/> : !usr.credentials ? 'Create Account' : 'Sign In'}
                </button>
                {usr.credentials ? <NavLink to="accounts/login/email-lookup" className="text-center text-[#367c2b] font-semibold hover:underline">Forgot Password</NavLink> : ''}

            </div>
        </>
    )
}
export default PanelShowcase