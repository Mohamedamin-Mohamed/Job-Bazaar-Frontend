import Image404 from "../../../../Images/404_illustration.png";
import {NavLink} from "react-router-dom";
import NavBar from "../../NavBar";

const Display404EmployerOrApplicant = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role

    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center mt-12">
                <div>
                    <img src={Image404} alt="" className="w-[127px] h-[196px]"/>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <h1 className="text-[#4f5666] font-semibold text-2xl">Page Not Found</h1>
                    <p className="my-3 text-[#4f5666] font-semibold"
                    >Sorry, this page is for {role === 'Employer' ? "applicants." : "employers"}</p>
                    <div className="flex text-[#2575a7] space-x-8">
                        <NavLink to="mailto:mohamedamin204080@gmail.com"
                                 className="w-[139px] h-[34px] border border-[#2575a7] bg-[#ffffff] font-semibold text-center pt-1">Contact
                            Support</NavLink>
                        <NavLink to={role === 'Employer' ? "/careerhub/my/jobs/uploaded" : "/careerhub/explore/jobs"}
                                 className="bg-[#2575a7] text-white w-[220px] h-[32px] font-semibold text-center pt-1">
                             {role === 'Applicant' ? "Search For Jobs" : "View Your Uploaded Jobs"}</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Display404EmployerOrApplicant