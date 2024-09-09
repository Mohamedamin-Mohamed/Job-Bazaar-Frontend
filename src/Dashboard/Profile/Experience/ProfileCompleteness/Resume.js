import Image from "../../../../Images/resume.svg";

const Resume = ()=>{
    return (
        <div className="flex flex-col h-[230px] border p-3 my-4">
            <div className="flex w-[350px]">
                <h1 className="text-lg font-semibold w-[64%] text-wrap">Complete profile with resume</h1>
                <img src={Image} alt="" className="w-[82px] h-[90px] ml-auto"/>
            </div>
            <div>
                <p className="w-[78%] mb-2">Add your career information in one step.</p>
                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm mt-11 cursor-not-allowed">Upload Resume</button>
            </div>
        </div>
    )
}
export default Resume