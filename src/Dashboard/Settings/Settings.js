import ReferralsRibbon from "../Referrals/ReferralsRibbon";
import {BiSolidUserAccount} from "react-icons/bi";
import {useState} from "react";
import Account from "./Account";
import Activity from "./Activity";
import JobAlerts from "./JobAlerts";

const Settings = () => {
    const [termsAndServices, setTermsAndServices] = useState(false)
    return (
        <>
            <ReferralsRibbon text={"Settings"} height={60}/>
            <Account/>
            <Activity/>
            <JobAlerts/>
        </>
    )
}
export default Settings