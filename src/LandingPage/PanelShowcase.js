import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";import {useState} from "react";
import {setFirstPanel, setSecondPanel} from "../Redux/UserSlice";

const PanelShowcase = ()=>{
    const usr = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const [pass, setPass] = useState("")
    const [showPass, setShowPass] = useState(false)
    const handleSubmit = ()=>{
        //in here verify the users password, and notify them if its wrong, else redirect them to the main dashboard
    }
    const handlePanelsShow = ()=>{
        console.log('Received')
        dispatch(setSecondPanel(false))
        dispatch(setFirstPanel(true))
    }
    return(
        <>
            <div className="flex flex-col justify-center mb-4  lg:ml-32 ">
                <h1 className=" mb-3 font-bold text-xl text-center">Welcome {usr.credentials ? 'back' : ''} to Job Bazaar.</h1>

                {!usr.credentials ? <p className="text-center">Create your account as {usr.usrEmail}</p> : <p className="flex my-2">Sign in to your account as <p className="font-bold">{usr.usrEmail.toUpperCase()}</p> </p>}
                {/*{usr.signupShow? <NavLink to={} onClick={()=> setLoginShow(true)}>Register with a different email</NavLink> : <NavLink onClick={()=> setLoginShow(true)} to={}>Sign in with a different email</NavLink>}*/}
                <NavLink onClick={()=> handlePanelsShow() } className="text-center text-[#008855]">{!usr.credentials ? 'Register': 'Sign In'} with a different email.</NavLink>
                <p className="mt-4 mb-2 text-[#00060c]">Password</p>
                <input value={pass} type={showPass ? 'text' : 'password'} onChange={(e) => setPass(e.target.value)}
                       className="w-[350px] border p-2 border-gray-600 rounded-md outline-none"/>
                <div className="flex my-3">
                    <input type={"checkbox"} checked={showPass} onChange={()=> setShowPass(!showPass)}/>
                    <p className="ml-4">Show Password</p>
                </div>
                <button className="hover:bg-[#00a264] p-3 border border-gray-600 rounded-md font-medium bg-black text-white my-3"
                        onClick={handleSubmit}>{!usr.credentials ? 'Create Account': 'Sign In' }
                </button>


            </div>
        </>
    )
}
export default PanelShowcase