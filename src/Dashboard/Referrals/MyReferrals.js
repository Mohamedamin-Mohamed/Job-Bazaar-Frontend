import Ribbon from "../Careerhub/GenericRibbon";
import {useEffect, useState} from "react";
import getReferrals from "../Careerhub/Jobs/FetchJobsAndApplications/getReferrals";
import Display404NotReferred from "./Display404NotReferred";
import DisplayReferrals from "./DisplayReferrals";

const MyReferrals = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [referrals, setReferrals] = useState({})
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
            const fetchReferrals = async () => {
                const response = await getReferrals(userInfo.email, new AbortController())
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
                    <Ribbon text={"My Referrals"} height={60}/>
                    {Object.keys(referrals).length === 0 ? <Display404NotReferred /> :
                        <DisplayReferrals referrals={referrals}/>}
                </>
                : null}
        </>
    )
}
export default MyReferrals
