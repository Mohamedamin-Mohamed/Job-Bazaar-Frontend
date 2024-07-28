import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md";

const Positions = () => {
    const [positions, setPositions] = useState(false)
    const [selected, setSelected] = useState(false);
    const ref = useRef(null)
    const [selectInput, setSelectInput] = useState("")
    const handleClick = () => {
        setPositions(!positions)
        setSelected(false)
        setSelectInput("")
    }
    const handleChange = (e) => {
        setSelectInput(e.target.value)
    }
    const handleSelect = () => {
        setSelectInput("")
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSelected(false)
                setSelectInput("")
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setSelected]);

    return (
            <div className="ml-2 ">

                <div className="flex md:w-[207px] w-full border-t flex-col cursor-pointer">

                    <div className="flex mr-6 pt-4" onClick={() => handleClick()}>
                        <h1 className={`font-medium ${positions ? "mb-2" : ""} mt-3`}>Positions/Communities</h1>
                        {
                            positions ?
                                <div className="ml-auto md:ml-20">
                                    <IoIosArrowForward size={20} color="gray" className={`mt-4`}/>
                                </div>
                                :
                                <div className="ml-auto md:ml-20">
                                    <IoIosArrowDown size={20} color="gray" className="mt-4 lg:mr-2"/>
                                </div>
                        }
                    </div>
                    <div className={`${!positions ? "border" : ""} rounded-xl mr-6 md:mr-0 md:w-[260px] mt-4 mx-1`}
                         onClick={() => setSelected(true)} ref={ref}>
                        {!positions && (
                            <div className="flex mt-2">
                                <input value={selectInput} onChange={handleChange} placeholder="Select"
                                       className={`w-full outline-none focus:border-blue-500 ml-4 pb-1.5`}
                                />

                                {
                                    !selected ? <MdArrowDropDown size={20} className="ml-auto mr-1"/> :
                                        <MdArrowDropUp size={20} className="ml-auto mr-1"/>
                                }

                            </div>
                        )}
                    </div>

                        {
                            selected && (
                                <div className="ml-2 border rounded-xl p-2 bg-white text-[#9b9b9b] md:w-[248px] w-[90%] mt-0.5">
                                    <p className="w-full">No results found</p>
                                </div>
                                    )}
                            </div>

            </div>
    )
}
export default Positions