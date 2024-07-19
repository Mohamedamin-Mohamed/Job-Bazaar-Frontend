import {NavLink, useNavigate} from "react-router-dom";
import {CgMenuGridO} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {MdArrowDropDown} from "react-icons/md";
import {IoMdArrowDropup} from "react-icons/io";
import {useMediaQuery} from "react-responsive";
import {setFirstName, setFirstPanel, setLastName, setSecondPanel, setUsrEmail} from "../../Redux/UserSlice";
import {clearLocationInfo, setLocationInfo} from "../../Redux/LocationSlice";

const NavBar = () => {
    const usrInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch()
    const [userSettingDropDown, setUserSettingDropDown] = useState(false)
    const [menuGrid, setMenuGrid] = useState(false)
    const [referrals, setReferrals] = useState(false)
    const navigate = useNavigate()
    const isMediumScreen = useMediaQuery({minWidth: 993}); // Set the breakpoint for md screens
    const abbreviatedName = usrInfo.firstName.substring(0, 1) + usrInfo.lastName.substring(0, 1)

    const handleLogout = () => {
        dispatch(setFirstName(''))
        dispatch(setLastName(''))
        dispatch(clearLocationInfo())
        dispatch(setSecondPanel(false))
        dispatch(setFirstPanel(true))
        navigate('/')
    }
    const handleMenuGrid = () => {
        setMenuGrid(!menuGrid)
        setUserSettingDropDown(false)
        setReferrals(false)
    }
    const handleUserSettingDropDown = () => {
        setUserSettingDropDown(!userSettingDropDown)
        setMenuGrid(false)
        setReferrals(false)
    }
    const handleReferrals = () => {
        setReferrals(!referrals)
        setUserSettingDropDown(false)
        setMenuGrid(false)
    }

    return (
        <div className="flex justify-between items-center p-4 mt-2">
            <NavLink to="/careerhub" className="text-3xl ml-16 text-[#367c2b] font-bold">Job Bazaar</NavLink>
            <nav className={`${isMediumScreen ? "flex space-x-5" : "hidden"}`}>
                <NavLink to='/careerhub' className="hover:text-[#367c2b] font-medium">Home</NavLink>
                <NavLink to='/careerhub/profile/career' className="hover:text-[#367c2b] font-medium">Career Interests</NavLink>
                <NavLink to='/careerhub/profile' className="hover:text-[#367c2b] font-medium">My Profile</NavLink>
                <NavLink to='/careerhub/explore/jobs' className="hover:text-[#367c2b] font-medium">Jobs</NavLink>
                <div className="flex hover:cursor-pointer" onClick={handleReferrals}>
                    <p className="hover:text-[#367c2b] font-medium">Referrals</p>
                    {!referrals ? <MdArrowDropDown size={28} color="black"/> :
                        <IoMdArrowDropup size={24} color="black"/>}
                </div>
                {referrals && (
                    <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2 w-full z-50 hover:cursor-pointer"
                        onClick={handleReferrals}>
                        <nav className="flex flex-col mt-12 bg-white p-[12px] w-[220px] h-[94px] ml-72 border">
                            <NavLink to='/refer' className="p-1">Refer a friend</NavLink>
                            <NavLink to='/careerhub/myreferrals' className="p-1">My Referrals</NavLink>
                        </nav>
                    </div>
                )}
            </nav>
            <div className="flex items-center">
                <CgMenuGridO size={30} className="mr-4 hover:cursor-pointer" onClick={handleMenuGrid}/>
                {
                    menuGrid && (
                        <nav className="flex absolute right-0 mt-32 mr-48 bg-white border p-[8px] w-[220px] h-[54px] z-50">
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
                    <div className="mt-[36px]">
                    <nav className={"flex flex-col absolute right-0 mt-[22px] mr-4 w-[350px] border p-4 bg-white z-50"}>
                        <NavLink to="/careerhub" className="mb-1">{usrInfo.firstName} {usrInfo.lastName}</NavLink>
                        <div className="flex flex-col pb-4">
                        <NavLink to="/careerhub/profile" className="p-1 hover:cursor-pointer">My Profile</NavLink>
                        <NavLink to="/careerhub/profile/career" className="p-1 hover:cursor-pointer">Career Interests</NavLink>
                    </div>
                        <div className="flex flex-col border-t border-b py-4">
                        <NavLink to="/careerhub/explore/jobs" className="p-1">Job Search</NavLink>
                        <NavLink to="/careerhub/explore/projects" className="p-1">Project Search</NavLink>
                        <NavLink to="/careerhub/explore/courses" className="p-1">Courses Search</NavLink>
                    </div>
                        <div className="flex flex-col border-b py-4">
                            <NavLink to="/careerhub/my/jobs/saved" className="p-1">My Jobs</NavLink>
                            <NavLink to="/careerhub/myreferrals" className="p-1">My Referrals</NavLink>
                        </div>
                        <div className="flex flex-col pt-4">
                        <NavLink to="/careerhub/settings" className="p-1 hover:cursor-pointer">Settings</NavLink>
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