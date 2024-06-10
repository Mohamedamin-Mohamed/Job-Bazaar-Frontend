import CommunityImage from '../Images/locked-jobs.webp'
const Jobs = ({setJobs})=>{
    return(
        <div className="fixed inset-0 flex items-start justify-center z-50 mt-24 bg-inherit bg-black ml-64" onMouseLeave={()=> setJobs(false)}>
            <div className="border-l border-b w-[28%] h-[220px] pl-4 pt-4">
                <p className="font-medium">Find the right job</p>
                <p>Millions of jobs. Search by what matters to you and find the one that's right for you.</p>
                <button className="border border-gray-500 mt-8  ml-10 p-2.5 rounded-md hover:bg-blue-600">Start using Job Bazaar</button>
            </div>
            <div className="border-r border-b h-[220px]">
                <img src={CommunityImage} alt=""/>
            </div>

        </div>
    )
}
export default Jobs