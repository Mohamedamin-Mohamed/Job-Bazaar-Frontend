import {useEffect, useState} from "react";
import AddressFetcher from "../Address/AddressFetcher";
import ProfileRibbon from "./ProfileRibbon";
import {NavLink, Outlet, useResolvedPath} from "react-router-dom";
import NavBar from "../Careerhub/NavBar";
import {toast, ToastContainer} from "react-toastify";

const Profile = () => {
    const [location, setLocation] = useState({latitude: null, longitude: null})
    const [error, setError] = useState(null)
    const experiencedPath = useResolvedPath("experience").pathname
    const careerInterestsPath = useResolvedPath("career").pathname

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords
                    setLocation({latitude, longitude})
                },
                (error) => {
                    setError('Geolocation error: ' + error.message)
                }
            )
        } else {
            setError('Geolocation is not supported by this browser. ')
            toast.error(error, {
                onClose: ()=> {
                    window.location.reload()
                }
            })
        }
    }, []);
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
            {location.latitude && location.longitude && (
                <AddressFetcher latitude={location.latitude} longitude={location.longitude} onError={(errorMsg) => {
                    setError(errorMsg)
                }}/>
            )}
            <Outlet />
        </div>
    )
}
export default Profile