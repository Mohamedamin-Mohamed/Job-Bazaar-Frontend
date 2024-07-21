import {IoClose} from "react-icons/io5";
import {useEffect} from "react";

const TermsOfService = ({open, handleOpen})=>{

    useEffect(() => {
        const scrollHandle = ()=>{
            document.body.style.overflow = open ? "hidden" : ''
        }
        scrollHandle()

        return()=>{
            document.body.style.overflow = ''
        }
    }, [open]);
    return(
        <div className={!open ? 'hidden' : 'fixed flex justify-center inset-0 items-center text-black backdrop-brightness-50'}>
            <div
                className="flex flex-col p-7 text-black rounded-xl bg-white w-[600px] border h-[540px] ease-in-out duration-500">
                <div className="flex mt-3">
                    <div>
                        <h1 className="text-3xl font-semibold mb-6">Terms of Services</h1>
                    </div>
                    <div className="ml-auto">
                        <IoClose size={25} className="ml-auto text-gray-700 hover:cursor-pointer" onClick={handleOpen}/>
                    </div>
                </div>
                <div className="flex-col overflow-y-scroll h-[500px] w-[565px] text-center flex justify-center text-2xl italic">
                    <div className="mx-6">
                    <p>The terms of service are currently unavailable. Please check back later.</p>
                    <p>We apologize for the inconvenience. Our legal team is diligently working to finalize the terms of service.</p>
                    <p>Once completed, the terms will be available on this page for your review. Thank you for your patience and understanding.</p>
                    <p>If you have any question in the meantime, please feel free to contact our support team.</p>
                </div>
                </div>
            </div>
        </div>
    )
}
export default TermsOfService