import {useEffect, useRef, useState} from "react";
import {MdOutlineFileUpload, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from "react-icons/md";
import {countries} from "countries-list";
import {IoIosClose} from "react-icons/io";
import Countries from "./Countries";
import {TfiClose} from "react-icons/tfi";
import FixedButtons from "../FixedButtons";
import ApplyToJob from "./ApplyToJob";
import GetName from "../Uploaded/GetUserInfo";
import {useSelector} from "react-redux";

const Apply = ({job, handleClose, open}) => {
    const countriesRef = useRef(null)
    const genderRef = useRef(null)
    const initialJobApplicationState = {
        resume: {name: '', file: ''},
        country: '',
        city: '',
        postalCode: '',
        gender: '',
        nationality: '',
        additionalDocument: {name: '', file: ''},
        employerContact: '',
        jobId: job.jobId
    }
    const [jobApplication, setJobApplication] = useState(initialJobApplicationState)
    const countryNames = Object.values(countries).map(country => country.name)
    const genders = [
        'Female', 'I do not wish to provide this information', 'Male'
    ]
    const userInfo = useSelector(state => state.userInfo)

    const handleFileUpload = (event, type) => {
        const file = event.target.files[0]
        if (file) {
            if (type === "resume") {
                setJobApplication(prevState => ({
                    ...prevState, resume: {
                        ...prevState.resume, name: file.name, file: file
                    }
                }))
            } else {
                setJobApplication(prevState => ({
                    ...prevState, additionalDocument: {
                        ...prevState.additionalDocument, name: file.name, file: file
                    }
                }))
            }
        }
    }
    const handleCheckboxChange = (event) => {
        const {value} = event.target;
        setJobApplication((prevState) => ({
            ...prevState, employerContact: value
        }))
    }
    const handleChange = (event) => {
        const {name, value} = event.target
        setJobApplication((prevState) => ({
            ...prevState, [name]: value
        }))
    }
    const [countriesShow, setCountriesShow] = useState(false)
    const [genderShow, setGenderShow] = useState(false)

    const filteredCountries = countryNames.filter(country =>
        country.toLowerCase().includes(jobApplication.country.toLowerCase()))

    const listHeight = filteredCountries.length > 0
        ? Math.min(filteredCountries.length * 50, 350) : 350

    const clearCountry = () => {
        setJobApplication((prevState) => ({
            ...prevState, country: ''
        }))
        setCountriesShow(true)
    }
    const clearGender = () => {
        setJobApplication((prevState) => ({
            ...prevState, gender: ''
        }))
        setGenderShow(true)
    }
    const handleGender = (gender) => {
        setJobApplication((prevState => ({
            ...prevState, gender: gender
        })))
        setGenderShow(false)
    }
    const handleClear = () => {
        setJobApplication(initialJobApplicationState)
    }
    const handleSave = async () => {
        const nameResponse = await GetName(userInfo.usrEmail, new AbortController())
        const user = await nameResponse.json()
        const response = ApplyToJob(new AbortController(), jobApplication, user)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countriesRef.current && !countriesRef.current.contains(event.target)) {
                setCountriesShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [countriesRef])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (genderRef.current && !genderRef.current.contains(event.target)) {
                setGenderShow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [genderRef])
    useEffect(() => {
        const scrollHandle = () => {
            document.body.style.overflow = open ? 'hidden' : ''
        }
        scrollHandle()
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])
    return (
        <div className="flex fixed justify-center items-center inset-0 z-50 backdrop-brightness-50">
            <div className="w-[590px] h-[820px] border rounded-md bg-white p-8 overflow-y-scroll">
                <TfiClose size={24} className="ml-auto cursor-pointer hover:rounded-full" onClick={handleClose}/>
                <div className="flex flex-col font-semibold mb-12">
                    <h1 className="text-2xl">Submit Application</h1>
                    <div className="flex gap-x-4">
                        <p>{job.jobId}</p>
                        <p>{job.position}</p>
                    </div>
                </div>
                <p>* Required fields</p>
                <div className="w-[570px] h-[530px] overflow-y-scroll">
                    <div className="flex flex-col mt-6 mb-8">
                        <div className="relative w-full flex justify-center">
                            <p>Resume *</p>
                            <div className="m-auto">
                                {jobApplication.resume.name.length > 0 ? jobApplication.resume.name : "No Resume Available"}
                                <input type="file" className="hidden" id="fileUpload"
                                       onChange={(event) => handleFileUpload(event, "resume")}/>
                                <label htmlFor="fileUpload"
                                       className="flex mt-4 w-[230px] h-[50px] bg-[#f3f4f6] p-3 border rounded-md cursor-pointer">
                                    <MdOutlineFileUpload color="gray" size={24}/>
                                    <p className="ml-2 text-[#2e333d] font-semibold">
                                        Upload New Resume...</p>
                                </label>
                            </div>
                        </div>

                        <div className="relative w-full flex justify-center my-12">
                            <p>Country *</p>
                            <div className="m-auto">
                                <div className="w-[250px] h-[45px] flex border border-gray-400 p-2 cursor-pointer "
                                     onClick={() => setCountriesShow(true)}>
                                    {jobApplication.country.length > 0 ?
                                        <IoIosClose size={27} color="gray" className="mt-0.5 cursor-pointer"
                                                    onClick={clearCountry}/> : ""}
                                    <input name="country" value={jobApplication.country} type="text"
                                           placeholder="Select" className="outline-none mt-1 cursor-pointer"
                                           onChange={handleChange}/>
                                    <div className="ml-auto">
                                        {jobApplication.country !== '' ?
                                            <MdOutlineKeyboardArrowUp size={20} color="gray"/> :
                                            <MdOutlineKeyboardArrowDown size={20} color="gray"/>}
                                    </div>
                                </div>
                                <div
                                    className={`${!countriesShow ? "" : "border"} absolute rounded-sm p-3 mt-1 mb-8 w-[250px] h-[${listHeight && countriesShow}px] 
                            ${listHeight && countriesShow === 350 ? "overflow-y-scroll" : ""} scroll-smooth z-50 bg-white`}
                                    ref={countriesRef}>
                                    {countriesShow && (
                                        <>
                                            <Countries countries={countryNames} countriesShow={countriesShow}
                                                       setJobApplication={setJobApplication}
                                                       setCountriesShow={setCountriesShow}
                                                       filteredCountries={filteredCountries}/>
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full flex justify-center my-4">
                            <p className="mr-8">City *</p>
                            <div className="m-auto">
                                <input type="text" value={jobApplication.city} name="city" onChange={handleChange}
                                       className="w-[250px] h-[45px] flex border border-gray-400 p-2 outline-none"/>
                            </div>
                        </div>
                        <div className="relative w-full flex justify-center my-12">
                            <p>Postal Code *</p>
                            <div className="m-auto">
                                <input type="text" value={jobApplication.postalCode} name="postalCode"
                                       onChange={handleChange}
                                       className="w-[270px] h-[45px] flex border border-gray-400 p-2 outline-none"/>
                            </div>
                        </div>
                        <div className="relative w-full flex justify-center my-12">
                            <p>Gender *</p>
                            <div className="m-auto">
                                <div className="w-[250px] h-[45px] flex border border-gray-400 p-2 cursor-pointer"
                                     onClick={() => setGenderShow(true)}>
                                    {jobApplication.gender.length > 0 ?
                                        <IoIosClose size={30} color="gray" className="mt-0.5 cursor-pointer"
                                                    onClick={clearGender}/> : ""}
                                    <input name="gender" value={jobApplication.gender} type="text"
                                           placeholder="Select" className="outline-none mt-1 cursor-pointer w-[300px]"
                                           onChange={handleChange}/>
                                    <div className="ml-auto mt-0.5">
                                        {jobApplication.gender !== '' ?
                                            <MdOutlineKeyboardArrowUp size={20} color="gray"/> :
                                            <MdOutlineKeyboardArrowDown size={20} color="gray"/>}
                                    </div>
                                </div>
                                {genderShow && (
                                    <div
                                        className="flex absolute flex-col cursor-pointer w-[340px] h-[120px] border border-gray-400 mt-1.5 p-3 z-50 bg-white"
                                        ref={genderRef}>
                                        {genders.map((gender, index) => (
                                            <div key={index} className="p-1 cursor-pointer"
                                                 onClick={() => handleGender(gender)}>
                                                <p>{gender}</p>
                                            </div>
                                        ))}
                                    </div>
                                )
                                }
                            </div>
                        </div>

                        <div className="relative w-full flex justify-center my-6">
                            <p>Nationality *</p>
                            <div className="m-auto">
                                <input type="text" value={jobApplication.nationality} onChange={handleChange}
                                       name="nationality"
                                       className="w-[280px] h-[45px] flex border border-gray-400 p-2 outline-none ml-1.5"/>
                            </div>
                        </div>
                        <div className="relative w-full flex justify-center my-12">
                            <p className="w-[1px] text-wrap">Additional Attachments</p>
                            <div className="m-auto">
                                <div className="flex-col ml-28">
                                    {jobApplication.additionalDocument.name.length > 0 ?
                                        <p>{jobApplication.additionalDocument.name}</p> :
                                        <p>Upload documents(s)</p>}
                                    <input type="file" className="hidden" id="additionalDoc"
                                           onChange={(event) => handleFileUpload(event, "additionalDoc")}/>
                                    <label htmlFor="additionalDoc"
                                           className="flex mt-4 w-[300px] h-[60px] bg-[#f3f4f6] p-3 border rounded-md cursor-pointer">
                                        <MdOutlineFileUpload color="gray" size={24}/>
                                        <p className="ml-2 text-[#2e333d] font-semibold">
                                            Upload Additional Attachments...</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full flex justify-center my-12">
                            <p className="w-[34%]">By proceeding, I would like to be considered for roles at Deere and
                                for
                                Deere’s recruitment team to contact me as follows: *</p>
                            <div className="m-auto">
                                <div className="flex flex-col ml-4">
                                    <div className="flex space-x-3">
                                        <input type="checkbox" value={'all available jobs'}
                                               checked={jobApplication.employerContact === "all available jobs"}
                                               onChange={handleCheckboxChange}/>
                                        <p>Employers can contact me for any open positions.</p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <input type="checkbox" value={'only roles I apply to'}
                                               checked={jobApplication.employerContact === 'only roles I apply to'}
                                               onChange={handleCheckboxChange}/>
                                        <p className="mt-3">Employers can contact me for only the roles I apply to.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FixedButtons handleClear={handleClear} handleOpen={handleClose} handleSave={handleSave}/>
            </div>
        </div>
    )
}
export default Apply