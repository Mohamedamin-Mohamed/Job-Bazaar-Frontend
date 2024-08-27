import NavBar from "./NavBar";
import {useMediaQuery} from "react-responsive";
import Image from "../../Images/application_success_1578821919412.png"
import {useNavigate} from "react-router-dom";
const ApplicationConfirmation = ()=>{
    const mediaQuery = useMediaQuery({minWidth: "900px"})
    const navigate = useNavigate()

    const handleNavigation = (request)=>{
        if(request === 'applications') {
            navigate('../my/jobs/applied')
        }
        else{
            navigate('../explore/jobs')
        }
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <NavBar />
            <div className={`${mediaQuery ? "flex" : "flex"} justify-center items-center`}>
                <img src={Image} alt="" className="w-[450px] h-[250px]" />
                <div className="flex flex-col">
                    <h2>Thank you for your interest in Job Bazaar</h2>
                    <h1>We have received your resume</h1>
                    <div className="flex">
                        <button onClick={()=> handleNavigation("jobs")}>View Jobs</button>
                        <button onClick={() => handleNavigation("applications")}>View Applications</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ApplicationConfirmation