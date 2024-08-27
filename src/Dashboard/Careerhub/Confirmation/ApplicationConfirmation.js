import {useMediaQuery} from "react-responsive";
import Image from "../../../Images/application_success_1578821919412.png"
import {useNavigate} from "react-router-dom";
import NavBar from "../NavBar";

const ApplicationConfirmation = () => {
    const mediaQuery = useMediaQuery({minWidth: "900px"})
    const navigate = useNavigate()

    const handleNavigation = (request) => {
        if (request === 'applications') {
            navigate('../my/jobs/applied')
        } else {
            navigate('../explore/jobs')
        }
    }
    return (
        <>
            <NavBar/>
            <div className={`flex justify-center items-center ${mediaQuery ? "flex" : "flex-col"} h-[85vh] space-x-20`}>
                <div>
                    <img src={Image} alt="" className="w-[450px] h-[250px]"/>
                </div>
                <div className="flex flex-col">
                    <div className={`space-y-3 mb-16 ${!mediaQuery ? "mt-6" : ""}`}>
                        <h2 className="text-[#1f2329] text-xl">Thank you for applying</h2>
                        <h1 className="text-[#1f2329] text-5xl w-[360px]">We have received your application</h1>
                    </div>
                    <div className="flex space-x-6">
                        <button className="text-white bg-[#325ab4] border
                        rounded-md w-[145px] h-[40px] hover:brightness-125"
                                onClick={() => handleNavigation("jobs")}>View more Jobs
                        </button>
                        <button className="text-[#325ab4] bg-[#ffffff] border border-[#325ab4]
                        rounded-md w-[212px] h-[40px]"
                                onClick={() => handleNavigation("applications")}>View application history
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ApplicationConfirmation