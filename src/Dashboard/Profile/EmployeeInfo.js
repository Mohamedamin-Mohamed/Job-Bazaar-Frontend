import {useSelector} from "react-redux";

const EmployeeInfo = () => {
    const locationInfo = useSelector(state => state.locationInfo)
    const userInfo = JSON.parse(localStorage.getItem('user'))
    const role = userInfo.role
    const email = userInfo.email

    return (
        <div className="flex ml-[40px] md:mt-0 mt-16">
            <div
                className={`flex flex-col justify-center pl-6 md:w-full md:mt-4 mx-2 w-[650px] ${role === 'Applicant' ? "h-[290px]" : "h-[200px]" } border mb-4 text-lg bg-[#f7f7f7]`}>
                <h1 className="text-2xl font-semibold pb-2">{role === 'Applicant' ? "Employee Information" : "Employer Information"}</h1>
                <div className="flex flex-col m-0 my-4">
                    <p className="text-[#69717f] text-lg">{role === 'Applicant' ? "Employee Email" : "Employer Email"}</p>
                    <p className="text-[#4f5666] font-semibold text-lg">{email}</p>
                </div>
                {role === 'Applicant' ? (
                <div className="flex flex-col my-2">
                    <p className="text-[#69717f] text-lg">Hire Date</p>
                    <p className="text-[#4f5666] font-semibold text-lg">N/A</p>
                </div>
                    ): ""}
                <div className="mt-3">
                    <p className="text-[#69717f] text-lg">{role === 'Applicant' ? "Employee Address" : "Employer Address"}</p>
                    <div className="flex text-[#4f5666] font-semibold text-lg">
                        <p>{locationInfo.city},</p>
                        <p className="mx-1">{locationInfo.states},</p>
                        <p>{locationInfo.country}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmployeeInfo