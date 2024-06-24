import {useEffect, useState} from "react";
import AddressFetcher from "./AddressFetcher";
import {useSelector} from "react-redux";
import ProfileRibbon from "./ProfileRibbon";
import {NavLink, Route, useResolvedPath} from "react-router-dom";
import NavBar from "./NavBar";
import Experience from "./Experience";
import CareerInterests from "./CareerInterests";


const Profile = () => {
    const [location, setLocation] = useState({latitude: null, longitude: null})
    const [error, setError] = useState(null)
    const locationInfo = useSelector(state => state.locationInfo)
    const usrInfo = useSelector(state => state.userInfo)
    const abbreviatedName = usrInfo.firstName.substring(0, 1) + usrInfo.lastName.substring(0, 1)
    const fullName = usrInfo.firstName + ' ' + usrInfo.lastName
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
        }
    }, []);
    return (
        <div>
            <NavBar/>
            <ProfileRibbon/>
            <nav className="flex my-12 mx-8 space-x-12 text-lg">
                <NavLink to={experiencedPath} className={({isActive}) =>
                    isActive ? "px-3 py-2 rounded-md text-sm font-medium bg-green-500 text-white" : "px-3 py-2 rounded-md text-sm font-medium"
                }>Experience</NavLink>
                <NavLink to={careerInterestsPath} className={({isActive}) =>
                    isActive ? "px-3 py-2 rounded-md text-sm font-medium bg-green-500 text-white" : "px-3 py-2 rounded-md text-sm font-medium"
                }>Career Interests</NavLink>
            </nav>
            {location.latitude && location.longitude && (
                <AddressFetcher latitude={location.latitude} longitude={location.longitude} onError={(errorMsg) => {
                    setError(errorMsg)
                }}/>
            )}
        </div>
    )
}
export default Profile