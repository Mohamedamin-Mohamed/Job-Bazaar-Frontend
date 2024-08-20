import {useMediaQuery} from "react-responsive";

const CompanyInfo = () => {
    const mediaQuery = useMediaQuery({minWidth: "1464px"})
    const mediaQuery2 = useMediaQuery({minWidth: "768px"})

    return (
        <div className={`flex flex-col ${mediaQuery ? "mx-6 mt-20 h-[580px]" : "mx-10 mt-6"} ${!mediaQuery2 ? "mt-8" : ""} bg-white p-6 border rounded-xl mb-8`}>
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
                    simplifies recruitment for both employers and job seekers, making the process efficient and
                    user-friendly..</p>
            </div>
        </div>
    )
}
export default CompanyInfo