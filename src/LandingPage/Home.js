import NavBar from "./NavBar";
import Hero from "./Hero";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            const validateToken = async () => {
                const response = await fetch(`http://localhost:8080/api/validate-token/`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    navigate('/careerhub')
                }
            }
            validateToken()
        }
    }, [token])
    return (
        <div>
            <NavBar/>
            <Hero/>
        </div>

    )
}
export default Home