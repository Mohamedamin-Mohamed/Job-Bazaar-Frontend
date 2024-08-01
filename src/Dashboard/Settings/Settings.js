import Ribbon from "../Careerhub/GenericRibbon";
import Account from "./Account";
import Activity from "./Activity";
import JobAlerts from "./JobAlerts";

const Settings = () => {
    return (
        <>
            <Ribbon text={"Settings"}/>
            <Account/>
            <Activity/>
            <JobAlerts/>
        </>
    )
}
export default Settings