import { FaPlus } from "react-icons/fa6";
import {useEffect, useState} from "react";
import AddEducation from "./AddEducation";
import {useSelector} from "react-redux";
import GetEducation from "./FetchEducation/GetEducation";
import { MdOutlineDelete } from "react-icons/md";
import { IoPencilSharp } from "react-icons/io5";
import DeleteEducation from "./FetchEducation/DeleteEducation";
import {toast, ToastContainer} from "react-toastify";

const Education =  () => {
    const usrInfo = useSelector(state => state.userInfo);
    const [open, setOpen] = useState(false);
    const[data, setData] = useState({})
    const[statusCode, setStatusCode] = useState("")

    const handleOpen = () => {
        setOpen(!open)
    }
    const email = usrInfo.usrEmail

    useEffect( () => {
        const abortController = new AbortController()
       const fetchData = async ()=>{
           try{
              const response = await GetEducation(email, abortController)

               if(response == null) return
               setStatusCode(response.status)

               if(!response.ok) return

               const result = await response.json()
               setData(result)
           }
           catch (err){
               console.error('Error fetching data', err)
           }
       }
       fetchData()
        return ()=>{
            abortController.abort()
        }

    }, [email]);

    const handleDelete = async ()=>{
        const response = await DeleteEducation(usrInfo.usrEmail)
        const result = await response.text();
        if(response.ok){
            toast.success(result, {
                onClose : ()=>{
                    setStatusCode("404")
                    window.location.reload()
                }
            })
        }
        else{
            toast.error(result);
        }
    }
    const handlePencil= ()=>{
        setOpen(true)
    }
    return (
        <div className="flex justify-center items-center md:mt-0 mt-16">
            <ToastContainer position="top-center" />
            <div
                className={`flex flex-col justify-center pl-4 md:w-[840px] mx-2 text-wrap w-[650px] ${statusCode === 404 ? "h-[190px]" : "h-[150px]"} border mb-4`}>
                <div className="flex">
                    <div>
                        <h1 className="text-xl font-semibold">Education</h1>
                    </div>
                    {open && <AddEducation open={open} handleOpen={handleOpen}/>}
                    {statusCode === 404 ? <div className="ml-auto mr-8">
                        <FaPlus size={20} color="gray" className="cursor-pointer" onClick={handleOpen}/>
                    </div>
                    :

                        <div className="flex ml-auto mr-8 space-x-4">
                            <MdOutlineDelete size={20} color="gray" className="cursor-pointer" onClick={handleDelete} />
                            <IoPencilSharp size={20} color="gray" className="cursor-pointer" onClick={handlePencil}/>
                        </div>
                    }

                </div>
                {statusCode === 404 ?
                    <div className="border p-4 my-6 mx-6 mr-10">
                        <p className="text-gray text-sm text-gray-400 font-semibold">
                        The education on the resume that you upload to Career Hub is imported into this section of your
                        profile. You can manually edit information in this section.
                    </p>
                </div>
                    :
                        <div className="flex flex-col">
                            <p>{data.school}</p>
                            <div className="flex">
                                <p>{data.degree}</p>
                                ,
                                <p>{data.major}</p>
                            </div>
                            <div className="flex">
                                <p>{data.startDate}</p>
                                -
                                <p>{data.endDate}</p>
                            </div>
                    </div>
                }
            </div>
        </div>

    )
}
export default Education;