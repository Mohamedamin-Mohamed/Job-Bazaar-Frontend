import Image from "../../../../Images/no_tasks.svg"
const NoTasks = ()=>{
    const userInfo = JSON.parse(localStorage.getItem('user'))
    return(
        <>
            <div className="flex ml-12 space-x-4 text-2xl font-semibold pb-4 mt-6 w-full">
                <h1>Welcome,</h1>
                <p>{userInfo.firstName}</p>
                <p>{userInfo.lastName}</p>
            </div>
            <div className="flex flex-col ml-12 mt-4 bg-white mx-8 p-4 rounded-xl">
                <div className=" h-[300px] p-4">
                    <h1 className="text-2xl font-semibold mb-6">My Tasks</h1>
                    <div className="flex flex-col justify-center items-center">
                        <img src={Image} alt=""/>
                        <p>You have no tasks.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NoTasks