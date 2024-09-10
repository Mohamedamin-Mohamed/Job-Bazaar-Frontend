import {useEffect, useState} from "react";
import getAvailableReferrals from "../Careerhub/Jobs/FetchJobsAndApplications/getAvailableReferrals";
import Ribbon from "../Careerhub/GenericRibbon";
import DisplayReferrals from "./DisplayReferrals";
import NoAvailableReferrals from "./NoAvailableReferrals";
import {ScaleLoader} from "react-spinners";

const AvailableReferrals = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [referrals, setReferrals] = useState([])
    const [loading, setLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    const fetchReferrals = async () => {
        setLoading(true)
        try {
            const response = await getAvailableReferrals(userInfo.email, new AbortController())
            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setReferrals(data)
            }
            setIsInitialized(true)
        } catch (err) {
            console.error("Encountered an error when fetching available referrals", err)
        } finally {
            setLoading(false)
            setIsInitialized(true)
        }
    }
    useEffect(() => {
            fetchReferrals().catch(err => {
                console.error(err)
                setLoading(false)
                setIsInitialized(true)
            })
        }, []
    )
    return (
        <>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader
                        color="#1c3e17"
                        height={100}
                        width={4}
                    />
                </div>
            )}

            {isInitialized &&
                <>
                    <Ribbon text={"Available Referrals"} height={60}/>
                    {Object.keys(referrals).length === 0 ?
                        <NoAvailableReferrals/> :
                        <DisplayReferrals referrals={referrals}/>}
                </>
            }
        </>
    )
}
export default AvailableReferrals