import ReferralsRibbon from "../Referrals/ReferralsRibbon";
import Account from "./Account";
import Activity from "./Activity";
import JobAlerts from "./JobAlerts";

const Settings = () => {
    return (
        <>
            <ReferralsRibbon text={"Settings"}/>
            <Account/>
            <Activity/>
            <JobAlerts/>
        </>
    )
}
export default Settings