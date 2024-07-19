import {useSelector} from "react-redux";
import ContactLinks from "./ContactLinks";
import ProfileCompleteness from "./ProfileCompleteness/ProfileCompleteness";
import Education from "./Education/Education";

const Experience = ()=>{

    return(
        <div className="">
           <ContactLinks />
            <ProfileCompleteness />
            <Education />
        </div>
    )
}
export default Experience