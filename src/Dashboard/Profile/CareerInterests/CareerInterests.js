import Skills from "./Skill/Skills";
import Roles from "./Role/Roles";
import RoleBased from "./Role/RoleBased";
import SkillBased from "./Skill/SkillBased";
import {useMediaQuery} from "react-responsive";

const CareerInterests = () => {
    const mediaQuery = useMediaQuery({minWidth: "1200px"})
    return (
        <>
            {mediaQuery ?
                <div className="flex justify-center items-center mb-6">
                <div>
                    <Skills/>
                    <Roles/>
                </div>
                    <div>
                        <RoleBased/>
                        <SkillBased/>
                    </div>
                </div>
                :
                <div>
                    <Skills />
                    <Roles />
                    <RoleBased />
                    <SkillBased />
                </div>
            }
        </>
    )
}
export default CareerInterests