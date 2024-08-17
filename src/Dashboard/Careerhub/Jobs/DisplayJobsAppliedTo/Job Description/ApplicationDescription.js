import CompanyInfo from "../CompanyInfo";
import Description from "./Description";
import {useMediaQuery} from "react-responsive";
import NavBar from "../../../NavBar";

const ApplicationDescription = () => {
    const mediaQuery = useMediaQuery({minWidth: "1440px"})
    return (
        <div className=" pb-6">
            <NavBar/>
            <div className={`${mediaQuery ? "flex" : "flex-col"} bg-[#f0f1f2]`}>
                <div className="flex flex-col">
                    <Description/>
                </div>
                <CompanyInfo/>
            </div>
        </div>
    )
}
export default ApplicationDescription