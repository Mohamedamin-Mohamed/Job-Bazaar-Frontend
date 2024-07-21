import { VscClose } from "react-icons/vsc";
import {useEffect, useRef} from "react";

const Suggestions = ({open, handleOpen, title, text})=>{
    const ref = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                handleOpen()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleOpen]);
    return(
        <div className={!open ? 'hidden' : 'fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50 z-50'}>
            <div className="flex flex-col p-7 text-black bg-white w-[516px] border h-[220px] ease-in-out duration-500" ref={ref}>
                <div className="flex">
                    <h1 className="text-lg font-semibold mb-6">{title} based suggestions</h1>
                    <VscClose size={22} className="ml-auto cursor-pointer hover:rounded-full hover:border hover:bg-gray-100" onClick={handleOpen}/>
                </div>
                <p className="text-[#4f5666] mb-6">Projects and courses that will help you {text} you're interested in.</p>
                <p className="font-semibold">0 suggestions(s)</p>
            </div>
        </div>
    )
}
export default Suggestions