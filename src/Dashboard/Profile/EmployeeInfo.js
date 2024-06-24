import {useSelector} from "react-redux";
import {MdLocationOn} from "react-icons/md";

const EmployeeInfo = ()=>{
    const locationInfo = useSelector(state => state.locationInfo)
    return(
        <div>
            <div>
                <h1>Employee Information</h1>
                <p>Employee Id</p>
                <p>N/A</p>
            </div>
            <p>Hire Date</p>
            <p>N/A</p>
            <div>
                <p>Business Location</p>
                <div className="flex space-x-4">
                    <MdLocationOn size={20}/>
                    <p>{locationInfo.city},</p>
                    <p>{locationInfo.states}</p>
                    <p>{locationInfo.country}</p>
                </div>
            </div>
        </div>
    )
}
export default EmployeeInfo