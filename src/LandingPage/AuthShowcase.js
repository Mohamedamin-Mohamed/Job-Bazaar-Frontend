import ImageLeft from "../Images/b.svg";
import ImageRight from "../Images/c.svg";
import LoginPanel from "./LoginPanel";
import {useSelector} from "react-redux";
import PanelShowcase from "./PanelShowcase";

const AuthShowcase = () => {
    const usr = useSelector(state => state.userInfo)

    return (
        <>
            <h1 className="text-center md:text-5xl text-4xl text-[#367c2b] font-medium pt-10">Your work people are
                here</h1>
            <div className="flex lg:flex-row flex-col items-center xl:justify-evenly">
                <div className="lg:ml-28">
                    <img src={ImageLeft} alt="" className="h-[450px] w-[500px]"/>
                </div>
                {usr.firstPanel && <LoginPanel/>}
                {usr.secondPanel && <PanelShowcase/>}

                <div className="lg:ml-24 ml-24">
                    <img src={ImageRight} alt="" className="h-[500px] w-[500px]"/>
                </div>

            </div>
        </>

    )
}
export default AuthShowcase