import Image404 from "../../../../Images/404_illustration.png";
import {NavLink} from "react-router-dom";
import NavBar from "../../NavBar";

const NoAvailableJobs = ({role}) => {
    return (
        <div>
            <NavBar/>
            <div className="flex flex-col justify-center items-center mt-12">
                <div>
                    <img src={Image404} alt="" className="w-[127px] h-[196px]"/>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <h1 className="text-[#4f5666] font-semibold text-2xl"> {role === 'Applicant' ? "No Available Jobs" : "No Uploaded Jobs"}</h1>
                    <p className="my-3 text-[#4f5666] font-semibold">{role === 'Applicant' ? "Sorry, there are no available jobs yet" :
                        "Sorry you haven't uploaded a job or you don't have an active job"}</p>
                    <div className="flex text-[#2575a7] space-x-8">
                        <NavLink to="mailto:mohamedamin204080@gmail.com"
                                 className="w-[139px] h-[34px] border border-[#2575a7] bg-[#ffffff] font-semibold text-center pt-1">Contact
                            Support</NavLink>
                        <NavLink to={role === 'Applicant' ? "/careerhub" : "/careerhub/jobs/upload"}
                                 className="bg-[#2575a7] text-white w-[140px] h-[32px] font-semibold text-center pt-1">{role === 'Applicant' ? "Home" : "Upload a Job"}</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NoAvailableJobs