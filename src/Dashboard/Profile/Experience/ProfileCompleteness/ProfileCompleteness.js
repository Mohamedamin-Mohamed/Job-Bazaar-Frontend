import {IoIosArrowUp} from "react-icons/io";
import {IoIosArrowDown} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import Resume from "./Resume";
import Skills from "./Skills";
import Studies from "./Studies";
import {MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight} from "react-icons/md";
import Goals from "./Goals";


const ProfileCompleteness = () => {
    const [arrowShow, setArrowShow] = useState(false)
    const scrollDivRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);
    const [toggle, setToggle] = useState(true);

    const handleScrollRight = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollBy({left: 200, behavior: 'smooth'});
        }
    }

    const handleScrollLeft = () => {
        if (scrollDivRef.current) {
            scrollDivRef.current.scrollBy({left: -200, behavior: 'smooth'});
        }
    }

    const updateScrollButtons = () => {
        if (scrollDivRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollDivRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft + clientWidth < scrollWidth);
        }
    }
    const handleToggle = () => {
        setArrowShow(!arrowShow)
        setToggle(!toggle)
    }

    useEffect(() => {
        const currentDiv = scrollDivRef.current;
        if (currentDiv) {
            currentDiv.addEventListener('scroll', updateScrollButtons);
            updateScrollButtons(); // Initial check
        }
        return () => {
            if (currentDiv) {
                currentDiv.removeEventListener('scroll', updateScrollButtons);
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center md:mt-0 mt-16">
            <div className={`flex flex-col justify-center pl-4 md:w-[840px] mx-2 text-wrap w-[650px] ${toggle ? "h-[500px]" : "h-[70px]"} border mb-4`}>
                <div className="flex">
                    <div className="flex flex-col w-[760px] mt-3 mb-6">
                        <h1 className="text-black font-medium text-xl">Make Career Hub work for you</h1>
                    </div>
                    <div className="ml-auto mr-8">
                        {!arrowShow ? <IoIosArrowUp size={22}
                                                    className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100"
                                                    onClick={handleToggle}/> :
                            <IoIosArrowDown size={22}
                                            className="mt-4 hover:cursor-pointer hover:border hover:rounded-lg hover:bg-gray-100"
                                            onClick={handleToggle}/>}
                    </div>
                </div>
                <div>
                    {toggle && (
                        <div className="flex flex-col border-t py-4 mr-3">

                            <p className="text-wrap text-lg mb-4">Add more to your profile and get recommendations for
                                the career
                                you want.</p>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold py-2">Profile Completeness</h1>
                                <div className="flex">
                                    <div className="md:w-[300px] w-[120px] h-[6px] bg-[#367c2b] rounded-md mr-1"></div>
                                    <div
                                        className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md mr-1"></div>
                                    <div
                                        className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md mr-1"></div>
                                    <div
                                        className="md:w-[300px] w-[120px] h-[6px] border border-[#367c2b] rounded-md"></div>
                                    <p className="flex">1/4</p>
                                </div>
                            </div>
                            <div className="relative w-full">
                                <div ref={scrollDivRef}
                                     className="border-t flex gap-x-6 overflow-x-auto whitespace-nowrap overflow-hidden no-scrollbar">
                                    <Resume/>
                                    <Skills/>
                                    <Studies/>
                                    <Goals/>
                                </div>
                                {showLeftButton && (
                                    <MdOutlineKeyboardArrowLeft
                                        onClick={handleScrollLeft}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 border border-[#367c2b] hover:bg-[#367c2b] hover:text-white text-[#367c2b] p-2 w-[44px] h-[44px] cursor-pointer"
                                    />
                                )}
                                {showRightButton && (
                                    <MdOutlineKeyboardArrowRight
                                        onClick={handleScrollRight}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 border border-[#367c2b] hover:bg-[#367c2b] hover:text-white text-[#367c2b] p-2 w-[44px] h-[44px] cursor-pointer"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProfileCompleteness;