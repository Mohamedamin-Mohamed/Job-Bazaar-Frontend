import {useSelector} from "react-redux";
import {MdLocationOn} from "react-icons/md";
import {useMediaQuery} from "react-responsive";

const EmployeeInfo = () => {
    const locationInfo = useSelector(state => state.locationInfo)
    const mediaQuery = useMediaQuery({minWidth: "790px"})
    return (
        <div className="flex ml-[40px] md:mt-0 mt-16">
            {/*"flex flex-col justify-center pl-4 md:w-[540px] md:mt-4 mx-2 w-[650px] h-[120px] border mb-4 text-lg"*/}
            <div className="flex flex-col justify-center pl-6 md:w-full md:mt-4 mx-2 w-[650px] h-[290px] border mb-4 text-lg bg-[#f7f7f7]">
                <h1 className="text-2xl font-semibold pb-2">Employee Information</h1>
                <div className="flex flex-col m-0 my-4">
                    <p className="text-[#69717f] text-lg">Employee Id</p>
                    <p className="text-[#4f5666] font-semibold text-lg">N/A</p>
                </div>
                <div className="flex flex-col my-2">
                    <p className="text-[#69717f] text-lg">Hire Date</p>
                    <p className="text-[#4f5666] font-semibold text-lg">N/A</p>
                </div>
                <div className="mt-3">
                    <p className="text-[#69717f] text-lg">Employee Address</p>
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