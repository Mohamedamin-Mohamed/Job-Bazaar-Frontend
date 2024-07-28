import {FaPlus} from "react-icons/fa6";
import {useEffect, useState} from "react";
import AddEducation from "./AddEducation";
import {useSelector} from "react-redux";
import GetEducation from "./FetchEducation/GetEducation";
import {MdOutlineDelete} from "react-icons/md";
import {IoPencilSharp} from "react-icons/io5";
import DeleteEducation from "./FetchEducation/DeleteEducation";
import {toast, ToastContainer} from "react-toastify";
import ImageSearch from "../ImageSearch/ImageSearch";
import {format} from "date-fns";

const Education = () => {
    const usrInfo = useSelector(state => state.userInfo);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})
    const [statusCode, setStatusCode] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [err, setErr] = useState("")

    const handleOpen = () => {
        setOpen(!open)
    }
    const email = usrInfo.usrEmail

    useEffect(() => {
        const fetchData = async () => {
            const abortController = new AbortController()
            try {
                const response = await GetEducation(email, abortController)

                if (response == null) return
                setStatusCode(response.status)

                if (!response.ok) return

                const result = await response.json()
                setData(result)
            } catch (err) {
                console.error('Error fetching data', err)
            }
        }
        fetchData()

    },[]);

    const handleDelete = async () => {
        const response = await DeleteEducation(usrInfo.usrEmail)
        const result = await response.text();
        if (response.ok) {
            toast.success(result, {
                onClose: () => {
                    setStatusCode("404")
                    window.location.reload()
                }
            })
        } else {
            toast.error(result);
        }
    }
    const handlePencil = () => {
        setOpen(true)
    }

    const getFormattedDate = (date) => {
        return date ? format(date, 'MM-yyyy') : ''
    }

    return (
        <div className="flex ml-[40px] md:mt-0 mt-16">
            <ToastContainer position="top-center"/>
            <div
                className={`flex flex-col justify-center pl-4 md:w-[840px] mx-2 text-wrap w-[650px] ${statusCode === 404 ? "h-[190px]" : "h-[200px]"} border mb-4`}>
                <div className="flex my-4">
                    <div>
                        <h1 className="text-xl font-semibold">Education</h1>
                    </div>
                    {open && <AddEducation open={open} handleOpen={handleOpen} statusCode={statusCode}/>}
                    {statusCode === 404 ? <div className="ml-auto mr-8">
                            <FaPlus size={20} color="gray" className="cursor-pointer" onClick={handleOpen}/>
                        </div>
                        :

                        <div className="flex ml-auto mr-8 space-x-6">
                            <MdOutlineDelete size={26} color="gray" className="cursor-pointer" onClick={handleDelete}/>
                            <IoPencilSharp size={26} color="gray" className="cursor-pointer" onClick={handlePencil}/>
                        </div>
                    }

                </div>
                {statusCode === 404 ?
                    <div className="border p-4 my-6 mx-6 mr-10">
                        <p className="text-gray text-sm text-gray-400 font-semibold">
                            The education on the resume that you upload to Career Hub is imported into this section of
                            your
                            profile. You can manually edit information in this section.
                        </p>
                    </div>
                    :

                    <div className="flex ml-4 gap-4">
                        <ImageSearch query={`${data.school} school logo`}
                                     handleImageUrl={(imageUrl) => setImageUrl(imageUrl)}
                                     onError={(err) => setErr(err)}/>
                        <div>
                            <img src={imageUrl} alt={err} className="w-[140px] h-[120px]"/>
                        </div>
                        <div className="mt-4">
                            <p className="text-[#000000de] font-semibold text-lg">{data.school}</p>
                            <div className="flex text-gray-500 font-semibold my-1">
                                <p>{data.degree}</p>
                                ,
                                <p className="ml-1">{data.major}</p>
                            </div>
                            <div className="flex text-[#00000099] text-lg font-semibold">
                                <p>{data.startDate}</p>
                                -
                                {data.endDate === getFormattedDate(new Date().toString()) ? "Current" :
                                    <p>{data.endDate}</p>}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}
export default Education;