import NavBar from "./NavBar";
import Ribbon from "./Ribbon";
import Activity from "./Activity";
import Tasks from "./Tasks";
import Interests from "./Interests";
import Explore from "./Explore/Explore";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import AddressFetcher from "../Address/AddressFetcher";

const CareerHub = () => {
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    const navigate = useNavigate()
    const [location, setLocation] = useState({latitude: null, longitude: null})
    const [error, setError] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
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
                onClose: () => {
                    window.location.reload()
                }
            })
        }
    }, [error]);

    useEffect(() => {
        const token = localStorage.getItem("token")

        const validateToken = async () => {
            if (token) {
                const response = await fetch(`http://localhost:8080/api/validate-token/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    toast.error("Token has expired please login", {
                        onClose: () => {
                            navigate('/accounts/login')
                        }
                    })

                }
            } else {
                toast.error('There is no valid token, login to receive a token', {
                    onClose: () => {
                        navigate('/accounts/login')
                    }
                })
            }
        }
        validateToken().catch(err => console.error(err))
    }, [navigate])

    return (
        <>
            {location.latitude && location.longitude && (
                <AddressFetcher latitude={location.latitude} longitude={location.longitude}
                                onError={(errorMsg) => {
                                    setError(errorMsg)
                                }}/>
            )}
            <NavBar/>
            <Ribbon/>
            <div className={` ${isMediumScreen ? "flex gap-x-6" : "flex-col gap-y-6"} justify-center mt-1`}>
                <ToastContainer position="top-center"/>
                {isMediumScreen ? (
                    <>
                        <div className="flex flex-col">
                            <Tasks/>
                            <Activity/>
                        </div>
                        <div className="flex flex-col">
                            <Interests/>
                            <Explore/>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={"flex flex-col justify-center items-center"}>
                            <div className="mx-4">
                                <Interests/>
                            </div>
                            <Explore/>

                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Tasks/>
                            <Activity/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
export default CareerHub