import {LuTimerReset} from "react-icons/lu";
import {useEffect, useRef, useState} from "react";
import {MdDelete, MdKeyboardArrowUp} from "react-icons/md";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Activity = () => {
    const [text, setText] = useState("Off")
    const [toggle, setToggle] = useState(false)
    const ref = useRef(null)

    const handleText = (text) => {
        setText(text)
        setToggle(false)
        toast.success('Your personalization has been set.')
    }

    const handleDelete = () => {
        toast.success('Activity has been triggered')
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setToggle(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [toggle]);
    return (
        <div className="flex justify-center items-center mt-8">
            <ToastContainer position="top-center"/>
            <div className="flex flex-col justify-center mx-2 pl-4 md:w-[840px] w-[450px] h-[300px] border">
                <div className="flex space-x-2">
                    <LuTimerReset size={20} color="gray" className="mt-2"/>
                    <h1 className="font-semibold text-lg">Activity based personalization settings</h1>
                </div>
                <p className="text-gray-500 ml-1 pb-4 border-b">Manage your activity based personalization</p>
                <div className="flex" ref={ref}>
                    <div className="flex flex-col pt-4">
                        <h1 className="font-semibold">Enable user activity based personalization</h1>
                        <p className="text-gray-500">Turn recommendations based on your activity on or off</p>
                    </div>
                    <div
                        className="flex justify-center items-center bg-[#ffde00] w-[72px] h-[36px] text-center font-semibold mr-6 mt-2 cursor-pointer ml-auto"
                        onClick={() => setToggle(!toggle)}>
                        <span>{text}</span>
                        <MdKeyboardArrowUp size={25}/>
                    </div>
                        {toggle && (
                            <div className="absolute md:ml-[726px] md:top-[448px] top-[502px] ml-[209px] flex flex-col justify-start mt-[224px] border w-[200px] h-[90px] p-2 bg-white">
                            <button className="flex justify-start p-1" onClick={() => handleText('Off')}>Off</button>
                            <button className="flex justify-start p-1" onClick={() => handleText('On')}>On</button>
                            </div>
                )}
            </div>
            <div className="flex flex-col my-6">
                <h1 className="font-semibold">Delete Activity</h1>
                <div className="flex">
                        <p className="text-gray-500">Clear your activity for personalization</p>
                        <MdDelete size={20} className="ml-auto mr-6 cursor-pointer" onClick={handleDelete}/>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Activity