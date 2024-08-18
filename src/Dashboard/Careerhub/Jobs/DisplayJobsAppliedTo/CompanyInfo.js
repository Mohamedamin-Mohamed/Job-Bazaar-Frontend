import {useMediaQuery} from "react-responsive";
import {useEffect, useRef, useState} from "react";

const CompanyInfo = () => {
    const mediaQuery = useMediaQuery({minWidth: "1464px"})
    const refHeight = useRef(null)
    const [height, setHeight] = useState("")

    useEffect(() => {
        const updateHeight = () => {
            if (refHeight.current) {
                setHeight(refHeight.current.offsetHeight)
            }
        }
        updateHeight() //initial render
        window.addEventListener('resize', updateHeight)
        return () => {
            window.removeEventListener('resize', updateHeight)
        }
    },[])
    return (
        <div className={`flex flex-col ${mediaQuery ? "mx-6" : "mx-10 mt-8"} bg-white p-6 border rounded-xl mb-8`} style={{height: `${height}px`}} ref={refHeight}>
            <div className={`${!mediaQuery ? `` : "w-[300px]"}`}>
                <h1 className="text-xl font-semibold my-3">Welcome</h1>
                <p className="text-[#494949]">Thank you for using Job Bazaar</p>
                <p className="text-[#494949]">We appreciate you taking time to complete an application. We encourage you
                    to track your progress through the
                    selection process and through new job alerts you can sign up to receive. If you are not already
                    doing so,
                    please join our conversation on our social media platforms (Facebook, Instagram, and LinkedIn).</p>
                <h1 className="my-6 text-xl font-semibold">About Us</h1>
                <p className="text-[#494949]">Job Bazaar is an innovative job application platform designed to connect
                    employers with top talent seamlessly.
                    Employers can easily post job openings, manage applications, and find the right candidates for their
                    teams.
                    Job seekers can explore a wide range of job opportunities, apply directly through the platform,
                    and track their application status. Whether you're an employer looking to hire or a job seeker
                    aiming to
                    advance your career, Job Bazaar simplifies the recruitment process, making it efficient and
                    user-friendly
                    for everyone involved.</p>
            </div>
        </div>
    )
}
export default CompanyInfo