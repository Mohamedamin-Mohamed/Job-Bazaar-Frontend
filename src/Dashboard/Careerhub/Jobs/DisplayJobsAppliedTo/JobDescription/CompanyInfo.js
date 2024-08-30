import {useMediaQuery} from "react-responsive";

const CompanyInfo = () => {
    const mediaQuery = useMediaQuery({minWidth: "1284px"})

    return (
        <div className={`flex ${mediaQuery ? "mx-14 w-[350px] h-[760px]" : "mx-10"} mt-4 bg-white p-10 border rounded-xl`}>
            <div className="flex flex-col ">
                <div>
                    <h1 className="text-xl font-semibold my-3">Welcome</h1>
                    <p className="text-[#494949]">Thank you for using Job Bazaar</p>
                    <p className="text-[#494949]">We appreciate your application. Track your progress and sign up
                        for job alerts. Stay updated on new opportunities and continue exploring career options with
                        us...</p>
                </div>
                <div>
                    <h1 className="my-6 text-xl font-semibold">About Us</h1>
                    <p className="text-[#494949]">Job Bazaar is an innovative job application platform designed to
                        connect
                        employers with top talent seamlessly.
                        Employers can easily post job openings, manage applications, and find the right candidates for
                        their
                        teams.
                        Job seekers can explore a wide range of job opportunities, apply directly through the platform,
                        and track their application status. Whether you're an employer looking to hire or a job seeker
                        aiming to
                        advance your career, Job Bazaar simplifies the recruitment process, making it efficient and
                        user-friendly
                        for everyone involved.</p>
                </div>
            </div>
        </div>
    )
}
export default CompanyInfo