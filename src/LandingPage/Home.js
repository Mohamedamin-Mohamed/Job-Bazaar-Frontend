import NavBar from "./NavBar";
import Hero from "./Hero";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
const Home = ()=>{
    return(
        <div>
            <NavBar/>
            <Hero />
        </div>

    )
}
export default Home