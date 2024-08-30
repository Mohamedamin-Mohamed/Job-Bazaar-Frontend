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
                <div>
                    <Description/>
                </div>
                <div>
                    <CompanyInfo/>
                </div>

            </div>
        </div>
    )
}
export default ApplicationDescription