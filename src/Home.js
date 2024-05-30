import EmailLookup from "./EmailLookup";
import {useSelector} from "react-redux";
import HomeTile from "./HomeTile";
import Login from "./Login";
import Signup from "./Signup";
import PasswordReset from "./PasswordReset";
import React from "react";

const Home = ()=>{
    const usr = useSelector(state=> state.userInfo)
    return(
        <>
            {usr.homeTileShow && <HomeTile />}
            {usr.loginShow && <Login />}
            {usr.signupShow && <Signup />}
            {usr.emailLookupShow && <EmailLookup />}
            {usr.passwordResetShow && <PasswordReset />}
            </>
    )
}
export default Home