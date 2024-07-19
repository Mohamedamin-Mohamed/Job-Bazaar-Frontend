import Image from '../../../../Images/skills.svg'
const Skills = ()=>{
    return (
        <div className="flex flex-col h-[230px] border p-3 my-4">
            <div className="flex w-[350px]">
                <h1 className="text-lg font-semibold w-[60%]">Showcase your skills</h1>
                <img src={Image} alt="" className="w-[82px] h-[70px] ml-auto"/>
            </div>
            <div>
                <p className="w-[90%] text-wrap mb-2">Show what you know to your teammates and managers. Get recommendations to grow.</p>
                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm mt-4">Add Skills</button>
            </div>
        </div>
    )
}
export default Skills