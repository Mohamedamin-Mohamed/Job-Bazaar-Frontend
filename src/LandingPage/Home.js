import NavBar from "./NavBar";
import Hero from "./Hero";
import {useSelector} from "react-redux";
const Home = ()=>{
    const usr = useSelector(state => state.userInfo)

    return(
        <div>
            <NavBar/>
            <Hero />
        </div>

    )
}
export default Home