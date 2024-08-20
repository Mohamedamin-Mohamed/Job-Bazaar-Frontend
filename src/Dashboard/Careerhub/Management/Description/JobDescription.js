import NavBar from "../../NavBar";
import Description from "../../Jobs/DisplayJobsAppliedTo/Job Description/Description";
import CompanyInfo from "../../Jobs/DisplayJobsAppliedTo/Job Description/CompanyInfo";
import {useMediaQuery} from "react-responsive";
import UploadedJobDescription from "./UploadedJobDescription";

const JobDescription = ()=>{
    const mediaQuery = useMediaQuery({minWidth: "1284px"})
    return (
        <div>
            <NavBar/>
            <div className={`${mediaQuery ? "flex" : "flex-col"} py-6 justify-center bg-[#f0f1f2]`}>
                <div className="flex flex-col justify-center items-center">
                    <UploadedJobDescription/>
                </div>
                <CompanyInfo/>
            </div>
        </div>
    )
}