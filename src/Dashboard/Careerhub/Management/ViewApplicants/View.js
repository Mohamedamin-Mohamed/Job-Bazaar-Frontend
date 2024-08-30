import NavBar from "../../NavBar";
import ViewApplicants from "./ViewApplicants";

const View = ()=>{
    return (
        <div className="flex flex-col">
            <NavBar />
            <ViewApplicants />
        </div>
    )
}
export default View