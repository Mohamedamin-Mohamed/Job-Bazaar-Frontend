import ProfileRibbon from "./ProfileRibbon";
import {NavLink, Outlet, useResolvedPath} from "react-router-dom";
import NavBar from "../Careerhub/NavBar";
import {ToastContainer} from "react-toastify";

const Profile = () => {
    const experiencedPath = useResolvedPath("experience").pathname
    const careerInterestsPath = useResolvedPath("career").pathname

    return (
        <div>
            <NavBar/>
            <ProfileRibbon/>
            <ToastContainer position="top-center"/>
            <nav className="flex ml-[8%] w-[87%] my-12 mx-8 space-x-12 text-lg border-b border-b-gray-400">
                <NavLink to={experiencedPath} className={({isActive}) =>
                    isActive ? "px-3 py-2 rounded-md font-medium text-[#367c2b] text-lg border-b-2 border-[#367c2b]" : "px-3 py-2 rounded-md font-medium text-lg"
                }>Experience</NavLink>
                <NavLink to={careerInterestsPath} className={({isActive}) =>
                    isActive ? "px-3 py-2 rounded-md font-medium text-[#367c2b] text-lg border-b-2 border-[#367c2b]" : "px-3 py-2 rounded-md font-medium text-lg"
                }>Career Interests</NavLink>
            </nav>
            <Outlet/>
        </div>
    )
}
export default Profile