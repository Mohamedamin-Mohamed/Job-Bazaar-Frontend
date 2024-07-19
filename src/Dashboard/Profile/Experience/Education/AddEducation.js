import {IoClose, IoCloseOutline} from "react-icons/io5"
import {useCallback, useEffect, useRef, useState} from "react";
import FixedButtons from "./FixedButtons";
import StartDate from "./Calendar/StartDate";
import EndDate from "./Calendar/EndDate";
import {format, parse} from "date-fns";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import SaveEducation from "./FetchEducation/SaveEducation";
import {setUsrEmail} from "../../../../Redux/UserSlice";
import getEducation from "./FetchEducation/GetEducation";

const AddEducation = ({open, handleOpen}) => {
    const usrInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startDateCalender, setStartDateCalender] = useState(false);
    const [endDateCalender, setEndDateCalender] = useState(false);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null)
    const [studyCheckBox, setStudyCheckBox] = useState(false)

    //this states will track the inputs field for education section
    const [school, setSchool] = useState("")
    const [major, setMajor] = useState("")
    const [degree, setDegree] = useState("")
    const [description, setDescription] = useState("")

    const handleStartDateCalender = (date) => {
        setStartDate(date)
    }
    const handleEndDateCalender = (date) => {
        setEndDate(date)
    }

    useEffect(() => {
        const scrollHandle = () => {
            document.body.style.overflow = !open ? '' : 'hidden'
        }
        scrollHandle()
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    const handleDateCalendarHide = useCallback((calendar) => {
        if (calendar === "start") setStartDateCalender(false)
        else setEndDateCalender(false)
    })

    useEffect(() => {
        const handleStartDateClickOutside = (event) => {
            if (startDateRef.current && !startDateRef.current.contains(event.target)) {
                handleDateCalendarHide("start")
            }
        }
        document.addEventListener('mousedown', handleStartDateClickOutside)
        return (() => {
            document.removeEventListener('mousedown', handleStartDateClickOutside)
        })
    }, [handleDateCalendarHide])

    useEffect(() => {
        const handleEndDateClickOutside = (event) => {
            if (endDateRef.current && !endDateRef.current.contains(event.target)) {
                handleDateCalendarHide("end")
            }
        }
        document.addEventListener('mousedown', handleEndDateClickOutside)
        return (() => {
            document.removeEventListener('mousedown', handleEndDateClickOutside)
        })
    }, [handleDateCalendarHide])
    const email = usrInfo.usrEmail

    useEffect(() => {
        const abortController = new AbortController();
        const fetchEducation = async () => {
            const response = await getEducation(email, abortController);
            if (response.status === 200) {
                const result = await response.json()
                console.log('result is', result)
                setSchool(result.school)
                setMajor(result.major)
                setDegree(result.degree)
                setDescription(result.description)

                const parsedStartDate = parse(result.startDate, 'MM-yyyy', new Date())
                setStartDate(parsedStartDate)

                const parsedEndDate = parse(result.endDate, 'MM-yyyy', new Date())
                setEndDate(parsedEndDate)

                console.log(parsedEndDate, 'end date is ', parsedEndDate)
            }
        }
        fetchEducation()
        return () => {
            abortController.abort()
        }
    }, [email])

    const getFormattedDate = (date) => {
        return date ? format(date, "MM-yyy") : ""
    }
    const handleCalendarsShow = (calendar) => {
        if (calendar === 'start') {
            setStartDateCalender(true)
            setEndDateCalender(false)
        } else {
            setEndDateCalender(true)
            setStartDateCalender(false)
        }
    }
    const handleStartDateCalendarHide = () => {
        setStartDateCalender(false)
        setStartDate(null)
    }
    const handleEndDateCalendarHide = () => {
        setEndDateCalender(false)
        setEndDate(null)
    }
    const handleSave = async () => {
        if (major === "") {
            toast.error('Please enter the required fields Major');
            return;
        }

        const education = {
            email: usrInfo.usrEmail,
            school: school,
            major: major,
            degree: degree,
            description: description,
            startDate: getFormattedDate(startDate),
            endDate: getFormattedDate(endDate),
        }
        console.log('response is djdjd', education, school)
        //store the object in the database now since at least the majors input field is not empty
        const response = await SaveEducation(education);
        dispatch(setUsrEmail(usrInfo.usrEmail))
        console.log("Here is the response", response)
        const text = await response.text();

        if (response.status === 200) {
            toast.success(text, {
                onClose: () => {
                    handleOpen()
                    window.location.reload()
                }
            })
        } else {
            toast.error(text);
        }
    }
    const handleClear = () => {
        setSchool("")
        setMajor("")
        setDegree("")
        setDescription("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <div
            className={!open ? 'hidden' : 'fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50'}>
            <div
                className="flex flex-col p-7 text-black rounded-xl bg-white w-[502px] border h-[750px] ease-in-out duration-500">
                <ToastContainer position="top-center"/>
                <div className="flex">
                    <div>
                        <h1 className="text-2xl font-semibold mb-6">Add Education</h1>
                    </div>
                    <div className="ml-auto">
                        <IoClose size={30} className="ml-auto text-gray-700 hover:cursor-pointer" onClick={handleOpen}/>
                    </div>
                </div>
                <div className="w-[470px] overflow-y-scroll relative">
                    <div className=" ml-[292px] mr-10 mt-">
                        <p className="ml-auto">* Required fields</p>
                    </div>
                    <div className="flex flex-col mt-2">
                        <h1 className="font-semibold text-lg">School</h1>
                        <input value={school} onChange={(e) => setSchool(e.target.value)}
                               placeholder="Ex. Stanford University"
                               className="w-[403px] h-[34px] border border-[#1a212e] p-2 mt-3"/>
                    </div>
                    <div className="flex flex-col mt-6">
                        <h1 className="font-semibold text-lg">Major*</h1>
                        <input value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Ex. Economics"
                               className="w-[403px] h-[34px] border border-[#1a212e] p-2 mt-3"/>
                    </div>
                    <div className="flex flex-col mt-6">
                        <h1 className="font-semibold text-lg">Degree</h1>
                        <input value={degree} onChange={(e) => setDegree(e.target.value)}
                               placeholder="Ex. Bachelor of Economics"
                               className="w-[403px] h-[34px] border border-[#1a212e] p-2 mt-3"/>
                    </div>
                    <div className="flex flex-col mt-6">
                        <h1 className="font-semibold text-lg">Description</h1>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                  className="w-[403px] h-[93px] border border-[#1a212e] mt-3 px-3 py-1 text-sm"></textarea>
                    </div>
                    <div className="flex flex-col mt-6" ref={startDateRef}>
                        <h1 className="font-semibold text-lg mb-2">Start Date</h1>

                        {startDateCalender &&
                            <div className="w-1/2 flex absolute top-[387px] left-[45px]">
                                <StartDate startDate={startDate} handleStartDateCalender={handleStartDateCalender}/>
                            </div>
                        }
                        <div className="flex w-[403px] h-[34px] border border-[#1a212e]">
                            <input type="text" onFocus={() => handleCalendarsShow("start")}
                                   placeholder="Start Date (MM/YYYY)" value={getFormattedDate(startDate)}
                                   className="pl-3 w-full outline-none"
                            />
                            {startDate &&
                                <div onClick={handleStartDateCalendarHide}>
                                    <IoCloseOutline size={18} color="gray"
                                                    className="ml-auto mt-1.5 mr-4 cursor-pointer"/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col mt-6" ref={endDateRef}>
                        <h1 className="font-semibold text-lg mb-2">End Date</h1>
                        {endDateCalender &&
                            <div className="w-1/2 flex absolute top-[480px] left-[48px]">
                                <EndDate endDate={endDate} handleEndDateCalender={handleEndDateCalender}/>
                            </div>
                        }
                        <div className="flex w-[403px] h-[34px] border border-[#1a212e]">
                            <input type="text" onFocus={() => handleCalendarsShow("end")}
                                   placeholder="End Date (MM/YYYY)" value={getFormattedDate(endDate)}
                                   className="pl-3 w-full outline-none"
                                   disabled={studyCheckBox}
                            />

                            {endDate &&
                                <div onClick={handleEndDateCalendarHide}>
                                    <IoCloseOutline size={18} color="gray"
                                                    className="ml-auto mt-1.5 mr-4 cursor-pointer"/>
                                </div>
                            }
                        </div>
                    </div>
                    {/*implement functionalities of eg; clear should clear all inputs, cancel should close the form and submit should upload the form*/}
                    <div className="flex mt-1">
                        <input type="checkbox" className="w-[16px] h-[16px] mt-1"
                               onChange={() => setStudyCheckBox(!studyCheckBox)}/>
                        <p className="ml-3">I currently study here</p>
                    </div>
                </div>
                <FixedButtons handleClear={handleClear} handleOpen={handleOpen} handleSave={handleSave}/>

            </div>
        </div>
    )
}
export default AddEducation;