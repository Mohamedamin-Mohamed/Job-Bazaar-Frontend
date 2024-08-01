import {useEffect, useRef, useState} from "react";
import {IoMdArrowDropdown} from "react-icons/io";
import {IoMdArrowDropup} from "react-icons/io";
import {useMediaQuery} from "react-responsive";

const WorkPlaceTypeDropDown = ({options, setJobDetails, workPlace, disable}) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)

    const textInputQuery = useMediaQuery({minWidth: "680px"})

    const handleOptionClick = (option) => {
        setIsOpen(false)
        setJobDetails((prevDetails) => ({
            ...prevDetails, workPlace: option.type
        }))
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(!isOpen)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])
    return (
        <div
            className={`relative ${textInputQuery ? "w-[301px]" : " w-[436px]"} ${disable ? "pointer-events-none opacity-50" : ""}`}>
            <div onClick={() => setIsOpen(!isOpen)}
                 className={`flex  ${textInputQuery ? "w-301px]" : "flex justify-center items-center w-full"} h-[40px] border rounded-md p-2 outline-none font-semibold focus:border-[#367c2b] cursor-pointer`}>
                {workPlace ? workPlace : 'Select the Workplace type'}
                {isOpen ? <IoMdArrowDropup className="ml-auto" size={24}/> :
                    <IoMdArrowDropdown className="ml-auto" size={24}/>}
            </div>
            {isOpen && (
                <div
                    className={`absolute top-full left-0 ${textInputQuery ? "w-[301px]" : "w-[436px]"} disabled:${disable}  h-[196px] mt-1 border rounded-md bg-white z-50 shadow-lg`}
                    ref={ref}>
                    {options.map((work_place, index) => (
                        <div key={index} onClick={() => handleOptionClick(work_place)}
                             className="flex flex-col p-2 hover:bg-gray-100 cursor-pointer">
                            <h1 className="font-semibold">{work_place.type}</h1>
                            <p>{work_place.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default WorkPlaceTypeDropDown