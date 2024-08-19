const Jobs = ({handleExplore})=>{
    return (
        <div className={`flex flex-col w-full border h-[288px] bg-[#fff89c] p-6 text-[#5c5500] mt-8 z-50`}>
            <div className="flex flex-col mb-6">
                <h1 className="font-medium text-lg">Jobs</h1>
                <p className="font-semibold">Browse opportunities for you or friends</p>
            </div>
            <div className="flex flex-col mb-6">
                <p className="font-semibold">Posted recently</p>
                <h1 className="font-medium text-lg">2024060 Engineer Product I - Robotics...</h1>
            </div>
            <div className="flex">
                <div className="w-[130px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm"><p>Computer
                    S..</p></div>
                <div className="w-[130px] h-[26px] border px-1 mx-2 bg-white text-[#9b9b9b] font-medium text-sm">
                    <p>Electrical Engi...</p></div>
                <div className="w-[130px] h-[26px] border px-1 bg-white text-[#9b9b9b] font-medium text-sm"><p>Software
                    Engi..</p></div>
            </div>
            <button className="bg-white w-[100%] mt-5 p-2 text-[#367c2b] font-semibold hover:bg-[#367c2b] hover:text-white" onClick={() => handleExplore('jobs')}>Explore
                Jobs
            </button>
        </div>
    )
}
export default Jobs