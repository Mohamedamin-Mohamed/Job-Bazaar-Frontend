import { FaPlus } from "react-icons/fa6";

const Education = ()=>{
    return(
        <div className="flex justify-center items-center md:mt-0 mt-16">
            <div className="flex flex-col justify-center pl-4 md:w-[840px] mx-2 text-wrap w-[650px] h-[190px] border mb-4">
                <div className="flex">
                    <div>
                        <h1 className="text-xl font-semibold">Education</h1>
                    </div>
                    <div className="ml-auto mr-8">
                        <FaPlus size={20} color="gray" className="cursor-pointer"/>
                    </div>
                </div>
                    <div className="border p-4 my-6 mx-6 mr-10">
                        <p className="text-gray text-sm text-gray-400 font-semibold">
                            The education on the resume that you upload to Career Hub is imported into this section of your profile. You can manually edit information in this section.
                        </p>
                </div>
            </div>
        </div>
    )
}
export default Education;