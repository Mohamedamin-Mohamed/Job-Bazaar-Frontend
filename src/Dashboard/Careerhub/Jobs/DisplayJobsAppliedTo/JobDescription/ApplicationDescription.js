import CompanyInfo from "./CompanyInfo";
import Description from "./Description";
import {useMediaQuery} from "react-responsive";
import NavBar from "../../../NavBar";

const ApplicationDescription = () => {
    const mediaQuery = useMediaQuery({minWidth: "1284px"})
    return (
        <div>
            <NavBar/>
            <div className={`${mediaQuery ? "flex" : "flex-col"} py-6 justify-center bg-[#f0f1f2]`}>
                <div className="flex flex-col justify-center items-center">
                    <Description/>
                </div>
                <CompanyInfo/>
            </div>
        </div>
    )
}
export default ApplicationDescription