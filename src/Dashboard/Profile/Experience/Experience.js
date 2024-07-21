import ContactLinks from "./ContactLinks";
import ProfileCompleteness from "./ProfileCompleteness/ProfileCompleteness";
import Education from "./Education/Education";
import {useMediaQuery} from "react-responsive";
import EmployeeInfo from "../EmployeeInfo";
import Work from "./Work Experience/Work";

const Experience = () => {
    const mediaQuery = useMediaQuery({minWidth: "790px"})
    return (
        <>
            {mediaQuery ?
                <div className="flex justify-center items-center">
                    <div className="flex">
                        <div>
                            <ProfileCompleteness/>
                            <Education/>
                            <Work />
                        </div>
                        <div>
                            <EmployeeInfo/>
                            <ContactLinks/>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <ContactLinks/>
                    <ProfileCompleteness/>
                    <Education/>
                    <Work />
                    <EmployeeInfo/>
                </div>
            }
        </>
    )
}
export default Experience