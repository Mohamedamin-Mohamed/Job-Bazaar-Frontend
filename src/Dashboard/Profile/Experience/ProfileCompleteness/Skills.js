import Image from "../../../../Images/resume.svg";

const ShowcaseSkills = ()=>{
    return (
        <div className="flex flex-col w-[350px] h-[210px] border p-3 my-4">
            <div className="flex">
                <h1 className="text-lg font-semibold w-[60%]">Showcase your skills</h1>
                <img src={Image} alt="" className="w-[82px] h-[90px] ml-auto"/>
            </div>
            <div>
                <p className="w-[70%] mb-2">Show what you know to your teammates and managers. Get recommendations to grow.</p>
                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm">Add Skills</button>
            </div>
        </div>
    )
}
export default ShowcaseSkills