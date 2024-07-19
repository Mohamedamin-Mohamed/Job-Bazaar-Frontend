import {Link, NavLink} from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { IoMail } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import {FaC} from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify'
import {useMediaQuery} from "react-responsive";
import {useEffect, useRef} from "react";

const ReferralsLinks = ({ handleLinksShow })=>{
    const isMediumScreen = useMediaQuery({minWidth: 998}); // Set the breakpoint for md screens
    const ref = useRef(null)
    const handleCopy = ()=>{
        toast.success("Job link has been copied to clipboard")
    }
    useEffect(() => {
        const handleClickOutside = (event) =>{
            if(ref.current && !ref.current.contains(event.target)){
                handleLinksShow()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return()=>{
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [handleLinksShow]);
    return(
        <div className="flex justify-center items-center top-2/4 md:ml-80 md:mt-32 mt-[120px] ml-[72px] w-[280px] absolute h-[238px] bg-white p-2 border ease-in-out " ref={ref}>
            <ToastContainer position="top-center" />
            <nav>
                <div className="flex p-2 space-x-2 text-[#4f5666] h-10 mt-1.5 rounded border-2 border-black hover:cursor-pointer">
                    <IoLogoLinkedin size={25} />
                    <NavLink to="https://www.linkedin.com">Refer via LinkedIn</NavLink>
                </div>
                <div className="flex p-2.5 space-x-2 text-[#4f5666] hover:cursor-pointer">
                    <FaFacebookSquare size={25} />
                    <NavLink to="https://www.facebook.com">Refer via Facebook</NavLink>
                </div>
                <div className="flex p-2.5 space-x-2 text-[#4f5666] hover:cursor-pointer">
                    <RiTwitterXLine size={25} />
                    <NavLink to="https://www.x.com">Refer via X (Formerly Twitter) </NavLink>
                </div>
                <div className="flex p-2.5 space-x-2 text-[#4f5666] hover:cursor-pointer">
                    <IoMail size={25} />
                    <NavLink to="mailto:">Refer via Email</NavLink>
                </div>
                <div className="flex p-2.5 space-x-2 text-[#4f5666] hover:cursor-pointer">
                    <FaCopy size={25} />
                    <NavLink to="" onClick={handleCopy}>Copy Link</NavLink>
                </div>
            </nav>
        </div>
    )
}
export default ReferralsLinks