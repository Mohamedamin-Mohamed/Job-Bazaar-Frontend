import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Jobs from "./Jobs";
import {useMediaQuery} from "react-responsive";

const Explore = () => {
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    const [arrowShow, setArrowShow] = useState(false)
    const navigate = useNavigate()

    const handleExplore = (role) => {
        if (role === 'Applicant')
            navigate('explore/jobs')
        else
            navigate('my/jobs/uploaded')
    }
    return (
        <div className={`"flex flex-col text-[#367c2b] mt-4 ${!isMediumScreen ? "mx-6 p-4 relative" : "flex px-4 pt-3.5"} w-full h-[280px] z-50 bg-white"`}>
            <div className="flex flex-col pb-10 md:flex-row md:mb-8">
                <div className={` ${arrowShow ? "h-[100px]" : "h-[460px]"} border w-full p-6 mr-8 mt-10 `}>
                    <div className={`${!arrowShow ? "border-b" : ""} pb-4`}>
                        <div className="flex">
                            <div className="flex flex-col w-[760px]">
                                <h1 className="text-black font-medium text-lg">Get more from Career Hub</h1>
                                <p className="text-[#9b9b9b] font-medium">Explore the many ways you can grow here</p>
                            </div>
                            <div className="ml-auto mr-4">
                                {!arrowShow ? <IoIosArrowUp size={20}
                                                            className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100"
                                                            onClick={() => setArrowShow(!arrowShow)}/> :
                                    <IoIosArrowDown size={20}
                                                    className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100"
                                                    onClick={() => setArrowShow(!arrowShow)}/>}
                            </div>
                        </div>

                    </div>
                    {!arrowShow && (
                        <div className="flex justify-self-center h-[100px]">
                            <Jobs handleExplore={handleExplore}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Explore