import NavBar from "./NavBar";
import Ribbon from "./Ribbon";
import Activity from "./Activity";
import Tasks from "./Tasks";
import Interests from "./Interests";
import Explore from "./Explore/Explore";
import {useMediaQuery} from "react-responsive";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const CareerHub = () => {
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    const navigate = useNavigate()

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
        validateToken()
    }, [])
    return (
        <>
            <NavBar/>
            <Ribbon/>
            <div className={`flex ${isMediumScreen ? "gap-x-6" : "flex-col gap-y-6"} justify-center mt-1`}>
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
                        <div className="flex flex-col justify-center items-center z-50">
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