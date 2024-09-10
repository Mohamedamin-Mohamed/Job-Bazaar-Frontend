import Ribbon from "../Careerhub/GenericRibbon";
import {useEffect, useState} from "react";
import getReferrals from "../Careerhub/Jobs/FetchJobsAndApplications/getReferrals";
import Display404NotReferred from "./Display404NotReferred";
import DisplayReferrals from "./DisplayReferrals";
import {ScaleLoader} from "react-spinners";

const MyReferrals = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const [referrals, setReferrals] = useState({})
    const [loading, setLoading] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)

    const fetchReferrals = async () => {
        try {
            const response = await getReferrals(userInfo.email, new AbortController())
            setLoading(false)
            if (response.ok) {
                const data = await response.json()
                setReferrals(data)
            }
            setIsInitialized(true)
        } catch (err) {
            console.error("Encountered an error when fetching your referrals", err)
        } finally {
            setLoading(false)
            setIsInitialized(true)
        }
    }

    useEffect(() => {
        setLoading(true)
        fetchReferrals().catch(err => {
            console.error(err)
            setLoading(false)
            setIsInitialized(true)
        })
    }, [])

    return (
        <div>
            {loading && (
                <div className="fixed flex justify-center items-center inset-0 backdrop-brightness-50">
                    <ScaleLoader
                        color="#1c3e17"
                        height={100}
                        width={4}
                    />
                </div>
            )}

            {isInitialized && (
                <>
                    <Ribbon text={"My Referrals"} height={60}/>
                    {Object.keys(referrals).length === 0 ? (
                        <Display404NotReferred/>
                    ) : (
                        <DisplayReferrals referrals={referrals}/>
                    )}
                </>
            )
            }
        </div>
    );

}
export default MyReferrals
