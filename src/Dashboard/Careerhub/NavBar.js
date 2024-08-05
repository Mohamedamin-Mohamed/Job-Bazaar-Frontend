import {NavLink, useNavigate} from "react-router-dom";
import {CgMenuGridO} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {MdArrowDropDown} from "react-icons/md";
import {IoMdArrowDropup} from "react-icons/io";
import {useMediaQuery} from "react-responsive";
import {setFirstName, setFirstPanel, setLastName, setSecondPanel} from "../../Redux/UserSlice";
import {clearLocationInfo} from "../../Redux/LocationSlice";
import localStorage from "redux-persist/es/storage";

const NavBar = () => {
    const usrInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    const [userSettingDropDown, setUserSettingDropDown] = useState(false)
    const [menuGrid, setMenuGrid] = useState(false)
    const [referrals, setReferrals] = useState(false)
    const [jobs, setJobs] = useState(false)
    const[role, setRole] = useState("")
    const navigate = useNavigate()
    const isMediumScreen = useMediaQuery({minWidth: 993}); // Set the breakpoint for md screens
    const abbreviatedName = usrInfo.firstName.substring(0, 1) + usrInfo.lastName.substring(0, 1)

    const dropDownRef = useRef(null)
    const feedBackRef = useRef(null)
    const jobsRef = useRef(null)

    const handleLogout = () => {
        dispatch(setFirstName(''))
        dispatch(setLastName(''))
        dispatch(clearLocationInfo())
        dispatch(setSecondPanel(false))
        dispatch(setFirstPanel(true))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate('/')
    }

    const handleMenuGrid = () => {
        setMenuGrid(!menuGrid)
    }
    const handleUserSettingDropDown = () => {
        setUserSettingDropDown(!userSettingDropDown)
        setMenuGrid(false)
    }
    const handleReferrals = () => {
        setReferrals(!referrals)
    }
    const handleJobs = () => {
        setJobs(!jobs)
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setUserSettingDropDown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [userSettingDropDown]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (feedBackRef.current && !feedBackRef.current.contains(event.target)) {
                setMenuGrid(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuGrid]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (jobsRef.current && !jobsRef.current.contains(event.target)) {
                setJobs(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [jobs])

    useEffect(() => {
        const getRoleFromLocalStorage = async ()=>{
            try {
                const userJson = await localStorage.getItem("user")
                if (userJson) {
                    const user = JSON.parse(userJson)

                    const role = user.role
                    if (role) {
                        setRole(role)
                    } else {
                        console.error("Role key doesn't exist in the user object.")
                    }
                }
                else{
                    console.error('User object nor found in localStorage')
                }
            }
            catch (err){
                console.error('Error parsing JSON from localStorage:', err)
            }
        }
        getRoleFromLocalStorage()
    }, []);

    return (
        <div className="flex justify-between items-center pt-4 pb-2 mt-2 border-b border-gray-400">
            <NavLink to="/careerhub" className="text-3xl ml-16 text-[#367c2b] font-bold">Job Bazaar</NavLink>
            <nav className={`${isMediumScreen ? "flex space-x-5" : "hidden"}`}>
                <NavLink to='/careerhub' className="hover:text-[#367c2b] font-medium text-lg">Home</NavLink>
                <NavLink to='/careerhub/profile/career' className="hover:text-[#367c2b] font-medium text-lg px-2 pl-2">Career
                    Interests</NavLink>
                <NavLink to='/careerhub/profile/experience' className="hover:text-[#367c2b] font-medium text-lg pl-2">My
                    Profile</NavLink>
                <div className="flex hover:cursor-pointer" onClick={handleJobs} >
                    <p className="hover:text-[#367c2b] font-medium text-lg pl-2">Jobs</p>
                    {!jobs ? <MdArrowDropDown size={28} color="black"/> :
                        <IoMdArrowDropup size={24} color="black"/>}
                </div>
                <div ref={jobsRef}>
                {jobs && (
                    <div
                        className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-full z-50 hover:cursor-pointer"
                        onClick={handleJobs}>
                        <nav className="flex flex-col mt-12 bg-white p-[12px] w-[220px] h-[94px] ml-96 border">
                            {role === 'Employer' ? "" :  <NavLink to='/careerhub/explore/jobs' className="p-1">Job Search</NavLink>}
                            <NavLink to={role === "Employer" ? '/careerhub/my/jobs/uploaded' : '/careerhub/my/jobs/saved'} className="p-1">My Jobs</NavLink>
                            {role === "Employer" ? <NavLink to='/careerhub/jobs/upload' className="p-1">Post a job</NavLink> : "" }
                        </nav>
                    </div>
                )}
                </div>
                <div className="flex hover:cursor-pointer" onClick={handleReferrals}>
                    <p className="hover:text-[#367c2b] font-medium text-lg px-2">Referrals</p>
                    {!referrals ? <MdArrowDropDown size={28} color="black"/> :
                        <IoMdArrowDropup size={24} color="black"/>}
                </div>
                {referrals && (
                    <div
                        className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-full z-50 hover:cursor-pointer"
                        onClick={handleReferrals}>
                        <nav className="flex flex-col mt-12 bg-white p-[12px] w-[220px] h-[94px] ml-[556px] border">
                            <NavLink to='/refer' className="p-1">Refer a friend</NavLink>
                            <NavLink to='/careerhub/myreferrals' className="p-1">My Referrals</NavLink>
                        </nav>
                    </div>
                )}
            </nav>
            <div className="flex items-center" ref={feedBackRef}>
                <CgMenuGridO size={30} className="mr-4 hover:cursor-pointer" onClick={handleMenuGrid}/>
                {
                    menuGrid && (
                        <nav className="flex absolute right-0 mt-32 mr-24 bg-white border p-[8px] w-[220px] h-[54px] z-50">
                            <NavLink to='/feedback/dashboard' className="w-[184px] h-[36px] ml-2">Feedback Center</NavLink>
                        </nav>
                    )
                }
                <div className="flex hover:cursor-pointer text-white" onClick={handleUserSettingDropDown}>
                    <div className="bg-[#367c2b] w-12 h-12 rounded-3xl text-center text-xl"><p
                        className="text-center mt-2">{abbreviatedName}</p></div>
                    {!userSettingDropDown ? <MdArrowDropDown size={30} color="black" className="mt-2"/> :
                        <IoMdArrowDropup size={26} color="black" className="mt-2"/>}
                </div>
                {userSettingDropDown && (
                    <div>
                        <nav
                            className={"flex flex-col absolute right-0 mt-[22px] mr-4 w-[350px] border p-4 bg-white z-50"}
                            ref={dropDownRef} onClick={handleUserSettingDropDown}>
                            <NavLink to="/careerhub" className="mb-1">{usrInfo.firstName} {usrInfo.lastName}</NavLink>
                            <div className="flex flex-col pb-4">
                                <NavLink to="/careerhub/profile/experience" className="p-1 hover:cursor-pointer">My
                                    Profile</NavLink>
                                <NavLink to="/careerhub/profile/career" className="p-1 hover:cursor-pointer">Career
                                    Interests</NavLink>
                            </div>
                            <div className="flex flex-col border-t border-b py-4">
                                {role !== 'Employer' &&  <NavLink to="/careerhub/explore/jobs" className="p-1">Job Search</NavLink>}
                                <NavLink to="/careerhub/explore/projects" className="p-1">Project Search</NavLink>
                                <NavLink to="/careerhub/explore/courses" className="p-1">Courses Search</NavLink>
                            </div>
                            <div className="flex flex-col border-b py-4">
                                <NavLink to={role === 'Employer' ? "/careerhub/my/jobs/uploaded" : "/careerhub/my/jobs/saved"} className="p-1">My Jobs</NavLink>
                                <NavLink to="/careerhub/myreferrals" className="p-1">My Referrals</NavLink>
                            </div>
                            <div className="flex flex-col pt-4">
                                <NavLink to="/careerhub/settings"
                                         className="p-1 hover:cursor-pointer">Settings</NavLink>
                                <NavLink to={''} onClick={() => handleLogout()} className="p-1">Logout</NavLink>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NavBar