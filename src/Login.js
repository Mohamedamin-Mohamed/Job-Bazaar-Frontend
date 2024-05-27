import {Link, NavLink} from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoClose } from "react-icons/io5";
import {useSelector, useDispatch} from "react-redux";
import {setLoginShow, setSignupShow} from "./Redux/UserSlice";


const Login = ()=>{
    const usr = useSelector(state => state.userInfo)

    const dispatch = useDispatch()
    const handleClose = ()=>{
        dispatch(setLoginShow(false))
    }
    const handleSignup = ()=>{
        dispatch(setLoginShow(false))
        dispatch(setSignupShow(true))
    }
    const handleSubmit = (e)=>{

    }
        return(
        <div className= 'fixed items-center border h-[500px] text-black  bg-white w-[400px] backdrop-blur-2x rounded-lg'>
            <IoClose size={30}  className='ml-auto hover:cursor-pointer hover:scale-110' onClick={ handleClose }/>
            <div className= 'ml-4'>
                <h1 className='text-center font-bold text-xl my-2'>Login</h1>
                <div className='flex flex-col'>
                <input placeholder= 'Email' type='email' className='border rounded-lg p-2 w-[90%] mb-3 mt-2' required/>
                <input placeholder= 'Password' type='password' className='border rounded-lg p-2 w-[90%] mb-4' required/>
                </div>
                <div className='flex justify-center'>
                <button to='/forgotPass' className='text-blue-500 hover:underline'>Forgot Password?</button>
                </div>
                <button type='submit' onSubmit={ (e)=> handleSubmit(e) } className='w-[90%] bg-blue-600 rounded-lg my-4 p-2 text-white'>Login</button>
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
                <div className= 'flex border rounded-lg p-2 mx-4 my-6 w-[90%] bg-blue-500 cursor-pointer'>
                     <FaFacebook size={25} color='blue'/>
                     <p className='ml-10 text-white'>Login with Facebook</p>
                </div>
            </div>
                <div className='flex border p-2 rounded-lg mx-4  w-[90%] cursor-pointer'>
                  <FcGoogle size={25} />
                  <p className='ml-10 text-gray-400'>Login with Google</p>
                </div>
            </div>
            </div>

    )
}
export default Login