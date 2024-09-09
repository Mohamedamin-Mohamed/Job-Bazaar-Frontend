import {useEffect, useState} from "react";
import getAvailableReferrals from "../Careerhub/Jobs/FetchJobsAndApplications/getAvailableReferrals";
import Ribbon from "../Careerhub/GenericRibbon";
import DisplayReferrals from "./DisplayReferrals";
import NoAvailableReferrals from "./NoAvailableReferrals";

const AvailableReferrals = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [referrals, setReferrals] = useState([])
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
            const fetchReferrals = async () => {
                const response = await getAvailableReferrals(userInfo.email, new AbortController())
                if (response.ok) {
                    const data = await response.json()
                    setReferrals(data)
                }
                setIsInitialized(true)
            }
            fetchReferrals().catch(err => {
                console.error(err)
                setIsInitialized(true)
            })
        }, []
    )
    return (
        <>
            {isInitialized ?
                <>
                    <Ribbon text={"Available Referrals"} height={60}/>
                    {Object.keys(referrals).length === 0 ?
                        <NoAvailableReferrals/> :
                        <DisplayReferrals referrals={referrals}/>}
                </>
                : null}
        </>
    )
}
export default AvailableReferrals