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
    }, [])
    return (
        //  style={{height: `${height}px`}} ref={refHeight}
        <div className={`flex flex-col ${mediaQuery ? "mx-6" : "mx-10"} bg-white p-6 border rounded-xl mb-8`}>
            <div className={`${!mediaQuery ? `` : "w-[300px]"}`}>
                <h1 className="text-xl font-semibold my-3">Welcome</h1>
                <p className="text-[#494949]">Thank you for using Job Bazaar</p>
                <p className="text-[#494949]">We appreciate your application. Track your progress and sign up
                    for job alerts. Stay updated on new opportunities and continue exploring career options with
                    us..</p>
                <h1 className="my-6 text-xl font-semibold">About Us</h1>
                <p className="text-[#494949]">Job Bazaar is a streamlined platform that connects employers with
                    top talent. Employers can efficiently post jobs, manage applications, and find the ideal candidates,
                    while job seekers can explore opportunities and track their application progress. Job Bazaar
                    simplifies recruitment for both employers and job seekers, making the process efficient and user-friendly..</p>
            </div>
        </div>
    )
}
export default CompanyInfo