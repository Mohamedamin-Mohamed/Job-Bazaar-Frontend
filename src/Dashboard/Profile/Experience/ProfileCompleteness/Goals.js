import Image from "../../../../Images/goals.svg";

const Goals = ()=>{
    return (
        <div className="flex flex-col h-[230px] border p-3 my-4">
            <div className="flex w-[350px]">
                <h1 className="text-lg font-semibold w-[60%]">Establish your goals</h1>
                <img src={Image} alt="" className="w-[82px] h-[90px] ml-auto"/>
            </div>
            <div>
                <p className=" text-wrap mb-2">Get recommendations based on what you want to learn and which jobs you want in the future.</p>
                <button className="bg-[#ffde00] w-[140px] h-[36px] rounded-sm mt-4gi">Add Goals</button>
            </div>
        </div>
    )
}
export default Goals;