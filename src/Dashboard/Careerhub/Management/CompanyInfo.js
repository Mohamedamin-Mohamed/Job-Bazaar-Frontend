import {useMediaQuery} from "react-responsive";

const CompanyInfo = () => {
    const mediaQuery = useMediaQuery({minWidth: "1400px"})

    return (
        <div
            className={`flex ${mediaQuery ? "mx-6 w-[350px] h-[920px]" : "mx-10 mb-10"} mt-4 bg-white p-10 border rounded-xl`}>
            <div className="flex flex-col ">
                <div>
                    <h1 className="text-xl font-semibold my-3">Welcome</h1>
                    <p className="text-[#494949]">Thank you for using Job Bazaar</p>
                    <p className="text-[#494949]">We appreciate your partnership with us. Manage your job postings,
                        review applications, and find the perfect
                        candidates for your team. Stay updated on new applicants and continue to explore ways to attract
                        top talent through our platform....</p>
                </div>
                <div>
                    <h1 className="my-6 text-xl font-semibold">About Us</h1>
                    <p className="text-[#494949]">Job Bazaar is an innovative job application platform designed to
                        connect employers with top talent seamlessly.
                        Employers can easily post job openings, manage applications, and find the right candidates for
                        their teams. Whether you're looking to hire
                        new talent or streamline your recruitment process, Job Bazaar makes it efficient and
                        user-friendly, ensuring you find the best fit for
                        your organization.</p>
                </div>
            </div>
        </div>
    )
}
export default CompanyInfo
