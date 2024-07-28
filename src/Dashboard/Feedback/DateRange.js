import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";
import {MdArrowRightAlt} from "react-icons/md";
import {BsCalendar4} from "react-icons/bs";
import DatePicker from "react-datepicker";
import {useEffect, useRef, useState} from "react";
import {addMonths, format} from "date-fns";
import 'react-datepicker/dist/react-datepicker.css'

const DateRange = () => {
    const [calendarShow, setCalendarShow] = useState(false)
    const [startDate, setStartDate] = useState(addMonths(new Date(), -1))
    const [endDate, setEndDate] = useState(new Date())
    const ref = useRef(null)
    const [dateRangeShow, setDateRangeShow] = useState(true);
    const [navLinksShow, setNavLinksShow] = useState({pending: true, completed: false, archived: false})

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setCalendarShow(!calendarShow)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return (() => {
            document.removeEventListener('mousedown', handleClickOutside)
        })
    }, [calendarShow])

    const getFormattedDate = (date) => {
        return startDate ? format(date, 'yyy-MM-dd') : ''
    }
    const handleLinksClick = (linkName) => {
        setNavLinksShow({
            pending: linkName === "pending",
            completed: linkName === "completed",
            archived: linkName === "archived"
        })
    }
    const handleCalendarShow = () => {
        if (calendarShow)
            setCalendarShow(calendarShow)
        else
            setCalendarShow(!calendarShow)
    }
    return (
        <div>
            <div className="flex justify-center items-center cursor-pointer"
                 onClick={() => setDateRangeShow(!dateRangeShow)}>
                <h1 className={`flex font-medium ${dateRangeShow ? "mb-2" : "mb-1"} ml-3 mt-3`}>Data Range</h1>
                {
                    !dateRangeShow ?
                        <div className="ml-auto md:ml-40 mr-4">
                            <IoIosArrowForward size={20} color="gray" className={`mt-4 ml-auto`}/>
                        </div>
                        :
                        <div className="ml-auto md:ml-40 mr-4">
                            <IoIosArrowDown size={20} color="gray" className="ml-auto mt-4 lg:mr-2"/>
                        </div>

                }
            </div>
            {
                dateRangeShow && (
                    <div>
                        <div className="flex text-gray border w-[280px] p-1.5 ">
                            <input placeholder="Start date" value={getFormattedDate(startDate)}
                                   className="w-[100px] h-[24px] outline-none focus:border-b-2 focus:border-[#367c2b] pb-1 cursor-pointer"
                                   onClick={handleCalendarShow} onChange={(e)=> setStartDate(e.target.value)}/>
                            <MdArrowRightAlt size={24} color="gray" className="ml-auto mr-2"/>
                            <input placeholder="End date" value={getFormattedDate(endDate)}
                                   className="w-[100px] h-[24px] outline-none focus:border-b-2 focus:border-[#367c2b] pb-1 ml-2 cursor-pointer"
                                   onClick={handleCalendarShow} onChange={(e)=> setStartDate(e.target.value)}/>
                            <BsCalendar4 size={14} color="gray" className="ml-auto mr-1 mt-1 cursor-pointer"/>
                        </div>
                    </div>
                )
            }
            {
                calendarShow && (
                    <div className="absolute flex mt-1" ref={ref}>
                        <div>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline/>

                        </div>
                        <div>
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} inline/>

                        </div>
                    </div>
                )
            }
            <div
                className={`${calendarShow ? "mt-4" : "mt-3"}flex justify-center items-center mt-2 text-lg mr-4 text-[#4f5666] w-full md:[w-350px] pb-2`}>
                <div onClick={() => handleLinksClick("pending")}
                     className={`${navLinksShow.pending ? "flex justify-center items-center p-2 bg-[#feffe6] cursor-pointer text-[#20571a] md:w-[280px] mr-4" :
                         "flex p-2 hover:bg-[#feffe6] cursor-pointer hover:text-[#20571a] md:w-[280px] mr-4"}`}>
                    <h1>Pending Feedback</h1>
                    <p className="ml-auto">0</p>
                </div>
                <div onClick={() => handleLinksClick("completed")}
                     className={`${navLinksShow.completed ? "flex p-2 bg-[#feffe6] cursor-pointer text-[#20571a] md:w-[280px] mr-4" :
                         "flex p-2 hover:bg-[#feffe6] cursor-pointer hover:text-[#20571a] md:w-[280px] mr-4"}`}>
                    <h1 className={`${navLinksShow.completed ? "text-[#20571a]" :
                        "hover:text-[#20571a]"}`}>Completed Feedback</h1>
                    <p className="ml-auto">0</p>
                </div>
                <div onClick={() => handleLinksClick("archived")}
                     className={`${navLinksShow.archived ? "flex p-2 bg-[#feffe6] cursor-pointer text-[#20571a] md:w-[280px] mr-4" :
                         "flex p-2 hover:bg-[#feffe6] cursor-pointer hover:text-[#20571a] md:w-[280px] mr-4"}`}>
                    <h1>Archived Feedback</h1>
                    <p className="ml-auto">0</p>
                </div>
            </div>
        </div>
    )
}
export default DateRange;
