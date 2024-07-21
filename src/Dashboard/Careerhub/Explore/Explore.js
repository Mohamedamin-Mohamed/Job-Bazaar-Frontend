import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Jobs from "./Jobs";
import Projects from "./Projects";

const Explore = () => {
    const [arrowShow, setArrowShow] = useState(false)
    const navigate = useNavigate()

    const handleExplore = (text) => {
        if (text === 'jobs')
            navigate('explore/jobs')
        else
            navigate('explore/projects')
    }
    return (
        <div className="flex flex-col md:flex-row w-full ml-8 md:mb-8">
            <div className={` ${arrowShow ? "h-[12px]" : "h-[780px]"} border p-6 mr-8 mt-10 `}>
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
                    <div className="h-[500px]">
                        <Jobs handleExplore={handleExplore}/>
                        <Projects handleExplore={handleExplore}/>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Explore