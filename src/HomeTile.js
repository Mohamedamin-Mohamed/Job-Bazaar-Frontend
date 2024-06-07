import Image from './images.jfif'
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {setHomeTileShow, setLoginShow} from "./Redux/UserSlice";
import {NavLink, useNavigate} from "react-router-dom";

const HomeTile = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = ()=>{
        // dispatch(setHomeTileShow(false))
        // dispatch(setLoginShow(true))
        navigate("/login")
    }
    // useEffect(async () => {
    //     //after user logs in with their github account, they are redirected to this page, so a code is attached to the endpoint as a query param
    //     //localhost:3000/accounts?code=AJJSJSHSHHSHS
    //     const queryString = window.location.search
    //     const urlParams = new URLSearchParams(queryString)
    //     const codeParam = urlParams.get("code")
    //     console.log(codeParam)
    //
    //     if(codeParam && (localStorage.getItem("accessTokens") === null)){
    //            const response =  await fetch("http://localhost:8080/getAccessToken?code=" + codeParam, {
    //                 method: 'get',
    //             })
    //         const data = await response.json()
    //         if(data.access_token){
    //             localStorage.setItem("accessToken", data.access_token)
    //         }
    //         }
    // }, []);
   const usr = useSelector(state => state.userInfo)
    return (
        <div className= 'flex justify-center items-center h-screen'>
            <div className= 'flex h-[250px] justify-center items-center mx-6'>
           <div className= 'border rounded-lg'>
               <img alt="" src={Image} className= 'h-[230px]'/>
           </div>
            <div className= 'border rounded-lg'>
                <div className= 'm-4'>
                <h1 className= 'text-xl font-bold m-3 text-center'>Welcome back</h1>
                <p className= 'text-xl'>To keep connected with us please login with your personal info</p>
                    <div className= 'flex justify-center'>
                <button className= 'bg-blue-600 w-[50%] rounded-xl p-3 my-8' onClick={handleLogin}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}
export default HomeTile
