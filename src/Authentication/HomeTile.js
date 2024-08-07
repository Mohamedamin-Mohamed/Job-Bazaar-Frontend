import Image from '../Images/images.jfif'
import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HomeTile = () => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/accounts/login')
    }

    const usr = useSelector(state => state.userInfo)
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='flex h-[250px] justify-center items-center mx-6'>
                <div className='border rounded-lg'>
                    <img alt="" src={Image} className='h-[230px]'/>
                </div>
                <div className='border rounded-lg'>
                    <div className='m-4'>
                        <h1 className='text-xl font-bold m-3 text-center'>Welcome back</h1>
                        <p className='text-xl'>To keep connected with us please login with your personal info</p>
                        <div className='flex justify-center'>
                            <button className='bg-blue-600 w-[50%] rounded-xl p-3 my-8' onClick={handleLogin}>Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default HomeTile
