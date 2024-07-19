import Image from "../../../../Images/education.svg";

const Studies = ()=>{
    return (
        <div className="flex flex-col h-[230px] border p-3 my-4">
            <div className="flex w-[350px] ">
                <h1 className="text-lg font-semibold w-[60%]">Show what you’ve learned</h1>
                <img src={Image} alt="" className="w-[82px] h-[100px] ml-auto"/>
            </div>
            <div>
                <p className="text-wrap mb-2">Enter your school, major and degree so your teammates get to know more about you.</p>
                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm mt-2.5">Add Education</button>
            </div>
        </div>
    )
}
export default Studies