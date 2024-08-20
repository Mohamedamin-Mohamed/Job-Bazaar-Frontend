import Ribbon from "../Careerhub/GenericRibbon";
import Account from "./Account";
import Activity from "./Activity";
import JobAlerts from "./JobAlerts";

const Settings = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    return (
        <div className="pb-10">
            <Ribbon text={"Settings"}/>
            <Account/>
            <Activity/>
            {role === 'Applicant' &&
                <JobAlerts/>
            }
        </div>
    )
}
export default Settings