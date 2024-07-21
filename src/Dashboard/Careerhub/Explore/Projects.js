const Projects = ({handleExplore})=>{
    return (
        <div className={`flex flex-col gap-6`}>
            <div className="bg-[#cacffc] mt-8  border md:w-full h-[288px] p-6">
                <div className="flex">
                    <h1 className="font-medium text-lg text-[#2b3271]">Projects</h1>
                    <p className="bg-[#f1f2ff] px-0.5 ml-2 h-[22px]">0</p>
                </div>
                <p className="font-medium text-[#2b3271] mb-6">Get hands-on experience</p>
                <div className="flex flex-col">
                    <p className="text-sm text-[#2b3271]">Recommended for you</p>
                    <h1 className="font-medium text-lg text-[#2b3271]">Project Marketplace Onboarding</h1>
                </div>
                <button className="bg-white w-[100%] mt-20 p-2 text-[#367c2b] hover:bg-[#367c2b] hover:text-white font-semibold"
                        onClick={() => handleExplore('projects')}>Explore Projects
                </button>
            </div>
        </div>
    )
}
export default Projects